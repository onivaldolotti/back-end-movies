import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { DatabaseModule } from '../config/database';

import { MoviesService } from './movies.service';
import { movieProviders } from './providers';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        HttpModule,
        ConfigModule.forRoot({ isGlobal: true }),
      ],
      providers: [...movieProviders, MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
