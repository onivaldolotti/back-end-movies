import { Module } from '@nestjs/common';
import { MoviesModule } from './movies';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MoviesModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
