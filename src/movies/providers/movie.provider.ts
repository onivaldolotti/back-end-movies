import { DATABASE } from '../../config/database/constants';
import { DataSource } from 'typeorm';
import { MOVIE } from '../constants';

import { MovieEntity } from '../entities';

export const movieProviders = [
  {
    provide: MOVIE.MOVIE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MovieEntity),
    inject: [DATABASE.DATA_SOURCE],
  },
];
