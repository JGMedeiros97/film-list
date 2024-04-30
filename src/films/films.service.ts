/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
// import { UpdateFilmDto } from './dto/update-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Films } from './entities/film.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FilmsService {
constructor(
  @InjectRepository(Films)
  private readonly filmsRepository: Repository<Films>,
  private readonly httpService: HttpService
) { }

  async create(createFilmDto: CreateFilmDto) {
    let url:string = process.env.OMDB_URL
    if (createFilmDto.id){
      const film = await this.filmsRepository.findOneBy({ 'imdbID' : createFilmDto.id })
      if (film) {
        return ({ 'Message': 'Filme já adcionado'})
      }
      url = url + '&i=' + createFilmDto.id
      const { data } = await firstValueFrom(this.httpService.get(url))
      return this.filmsRepository.save(this.ConvertResponse(data));
    } else if (createFilmDto.title) {
      url = url + '&t=' + createFilmDto.title
      if (createFilmDto.year) {
        url = url + '&y=' + createFilmDto.year
        const { data } = await firstValueFrom(this.httpService.get(url))
        const film = await this.filmsRepository.findOneBy({ 'title' : createFilmDto.title })
        if (film && film.imdbID == data.imdbID) {
        return ({ 'Message': 'Filme já adcionado'})
        }
        return this.filmsRepository.save(this.ConvertResponse(data));
      }
      const { data } = await firstValueFrom(this.httpService.get(url))
      const film = await this.filmsRepository.findOneBy({ 'title' : createFilmDto.title })
      if (film && film.imdbID == data.imdbID) {
        return ({ 'Message': 'Filme já adcionado'})
      }
      return this.filmsRepository.save(this.ConvertResponse(data));
    }
    return 'Por favor informe um ID Imdb ou Título válidos para realizar a busca.'
  }

  async findAll() {
    return await this.filmsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} film`;
  }

  // update(id: number, updateFilmDto: UpdateFilmDto) {
  //   return `This action updates a #${id} film`;
  // }

  remove(id: number) {
    return `This action removes a #${id} film`;
  }

  private ConvertResponse(data){
    return {
      'title': data.Title,
      'imdbID': data.imdbID,
      'year': data.Year,
      'rated': data.Rated,
      'released': data.Released,
      'runtime': data.Runtime,
      'genre': data.Genre
    }
  }
}
