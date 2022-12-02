import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class QueryDto {
  @ApiProperty()
  @IsOptional()
  take: number;

  @IsOptional()
  @ApiProperty()
  skip: number;
}
