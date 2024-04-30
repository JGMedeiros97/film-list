/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'films' })
export class Films {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title', nullable: false })
  title: string;

  @Column({ name: 'ImdbID', nullable: false, unique: true })
  imdbID: string;

  @Column({ name: 'year', nullable: false })
  year: string;

  @Column({ name: 'rated', nullable: false })
  rated: string;

  @Column({ name: 'released', nullable: false })
  released: string;

  @Column({ name: 'runtime', nullable: false })
  runtime: string;

  @Column({ name: 'genre', nullable: false })
  genre: string;
}
