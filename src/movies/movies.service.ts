import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';

import { MOVIE } from './constants';
import { MovieEntity } from './entities';
import { ConfigService } from '@nestjs/config';
import { faker } from '@faker-js/faker';
import { PaginatedResult } from './dto/paginated.dto';

interface ITmdbMovie {
  title: string;
  overview: string;
  poster_path: string;
}

@Injectable()
export class MoviesService {
  constructor(
    @Inject(MOVIE.MOVIE_REPOSITORY)
    private movieRepository: Repository<MovieEntity>,
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async findAll(query): Promise<PaginatedResult> {
    const { take, skip } = query;

    const [result, total] = await this.movieRepository.findAndCount({
      take: take || 10,
      skip: (skip || 0) * take,
    });

    if (result.length <= 0) {
      return this.getMoviesFromTmdb();
    }

    return new PaginatedResult({
      data: result,
      page_count: result.length,
      count: total,
    });
  }

  async create(moviesData: MovieEntity[]) {
    try {
      return await this.movieRepository.save(moviesData);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Erro ao salvar os filmes',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async transformMoviesFromTmdb(
    moviesData: ITmdbMovie[],
  ): Promise<MovieEntity[]> {
    const filteredMovies: MovieEntity[] = [];

    for (const movie of moviesData) {
      filteredMovies.push(
        this.movieRepository.create({
          titulo: movie.title,
          descricao: movie.overview,
          banner: `${this.configService.get('MOVIE_API_IMAGE_URL')}${
            movie.poster_path
          }`,
          produtor: faker.name.fullName(),
          diretor: faker.name.fullName(),
        }),
      );
    }
    return await this.create(filteredMovies);
  }

  async getMoviesFromTmdb(): Promise<PaginatedResult> {
    const movies: ITmdbMovie[] = [];

    for (let i = 1; i <= 3; i++) {
      const { data } = await firstValueFrom(
        this.httpService
          .get(
            `https://api.themoviedb.org/3/search/movie?api_key=${this.configService.get(
              'MOVIE_API_KEY',
            )}&include_adult=false&query=marvel&page=${i}&language=pt-BR`,
          )
          .pipe(
            catchError((error: AxiosError) => {
              console.log(error.response.data);
              throw new HttpException(
                'Erro ao consultar a api de filmes',
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
            }),
          ),
      );
      movies.push(...data.results);
    }
    const result = await this.transformMoviesFromTmdb(movies);

    return new PaginatedResult({
      data: result.slice(0, 10),
      page_count: 10,
      count: result.length,
    });
  }
}
