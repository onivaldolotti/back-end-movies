import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  titulo: string;

  @Column()
  @ApiProperty()
  descricao: string;

  @Column()
  @ApiProperty()
  diretor: string;

  @Column()
  @ApiProperty()
  produtor: string;

  @Column()
  @ApiProperty()
  banner: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
