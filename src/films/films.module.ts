/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Films } from './entities/film.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Films]),
    HttpModule
],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
