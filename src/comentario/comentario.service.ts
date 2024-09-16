import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comentario } from './entities/comentario.entity';
import { Publicacion } from 'src/publicacion/entities/publicacion.entity';

@Injectable()
export class ComentarioService {

  constructor(
    @InjectRepository(Comentario) private readonly commentRepository: Repository<Comentario>,

    @InjectRepository(Publicacion) private readonly postRepository: Repository<Publicacion>
  ) { }

  async create(createComentarioDto: CreateComentarioDto) {

    const post = await this.postRepository.findOneBy({ id: createComentarioDto.post })

    if (!post) throw new BadRequestException('Publicación not found')

    return await this.commentRepository.save({ ...createComentarioDto, post })
  }

  async findAll() {
    return await this.commentRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} comentario`;
  }

  update(id: number, updateComentarioDto: UpdateComentarioDto) {
    return `This action updates a #${id} comentario`;
  }

  async remove(id: number) {
    return await this.commentRepository.delete(id)
  }
}
