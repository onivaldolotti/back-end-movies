import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { PaginatedResult } from './dto/paginated.dto';
import { QueryDto } from './dto/query.dto';
import { MoviesService } from './movies.service';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiResponse({
    description: 'Retorna uma lista de filmes paginada',
    type: PaginatedResult,
  })
  async findAll(@Query() query: QueryDto): Promise<PaginatedResult> {
    return await this.moviesService.findAll(query);
  }
}
