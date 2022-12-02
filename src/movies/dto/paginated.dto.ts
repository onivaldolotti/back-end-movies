import { ApiProperty } from '@nestjs/swagger';
import { MovieEntity } from '../entities';

interface IPaginationResultInterface {
  data: MovieEntity[];
  page_count: number;
  count: number;
}

export class PaginatedResult {
  @ApiProperty({ type: () => [MovieEntity] })
  data: MovieEntity[];

  @ApiProperty()
  page_count: number;

  @ApiProperty()
  count: number;

  constructor(paginationResults: IPaginationResultInterface) {
    this.data = paginationResults.data;
    this.page_count = paginationResults.page_count;
    this.count = paginationResults.count;
  }
}
