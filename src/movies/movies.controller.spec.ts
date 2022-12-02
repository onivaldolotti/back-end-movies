import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../config/database';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { movieProviders } from './providers';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('MoviesController', () => {
  let controller: MoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        HttpModule,
        ConfigModule.forRoot({ isGlobal: true }),
      ],
      controllers: [MoviesController],
      providers: [MoviesService, ...movieProviders],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
