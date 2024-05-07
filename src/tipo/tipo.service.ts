import { Injectable } from '@nestjs/common';
import { CreateTipoDto } from './dto/create-tipo.dto';
import { UpdateTipoDto } from './dto/update-tipo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tipo } from './entities/tipo.entity';
import { Repository } from "typeorm";

@Injectable()
export class TipoService {

  constructor(
    @InjectRepository(Tipo) private readonly tipoRepository: Repository<Tipo>
  ) { }

  async create(createTipoDto: CreateTipoDto) {
    return await this.tipoRepository.save(createTipoDto);
  }

  async findAll() {
    return await this.tipoRepository.find()
  }

  async findOne(id: number) {
    return await this.tipoRepository.findOneBy({ id });
  }

  async update(id: number, updateTipoDto: UpdateTipoDto) {
    return await this.tipoRepository.update(id, updateTipoDto)
  }

  async remove(id: number) {
    return await this.tipoRepository.delete(id)
  }
}
