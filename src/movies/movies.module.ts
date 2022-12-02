import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { DatabaseModule } from '../config/database';
import { movieProviders } from './providers';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [MoviesController],
  providers: [...movieProviders, MoviesService],
})
export class MoviesModule {}
