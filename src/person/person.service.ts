import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person) private readonly personRepository: Repository<Person>
  ) { }

  async create(createPersonDto: CreatePersonDto) {
    try {
      return await this.personRepository.save(createPersonDto);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Person already exists');
      }
      throw error;
    }
  }

  async findAll() {
    return await this.personRepository.find()
  }

  async findOne(id: string) {
    const person = await this.personRepository.findOneBy({ id });
    if (!person) {
      throw new NotFoundException(`Person with id ${id} not found`);
    }
    return person;
  }

  async update(id: string, updatePersonDto: UpdatePersonDto) {
    const result = await this.personRepository.update(id, updatePersonDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Person with id ${id} not found`);
    }
    return this.findOne(id);
  }

  async remove(id: string) {
    const result = await this.personRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Person with id ${id} not found`);
    }
    return { deleted: true };
  }
}
