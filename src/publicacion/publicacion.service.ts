import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-publicacion.dto';
import { UpdatePostDto } from './dto/update-publicacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publicacion } from './entities/publicacion.entity';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Publicacion) private readonly postsRepository: Repository<Publicacion>,
  ) { }

  async create(createPostDto: CreatePostDto, user: any) {

    return await this.postsRepository.save({ ...createPostDto, userId: user.userId })
  }

  async findAll(user: any) {
    if (user.role === Role.ADMIN) return await this.postsRepository.find()

    return await this.postsRepository.find({
      where: { userId: user.userId },
    }); //{ relations: ['user'] }
  }

  async findOne(id: number, user: any) {
    const postFound = await this.postsRepository.findOneBy({ id })

    if (!postFound) throw new BadRequestException({ message: 'Post not found' })

    if (user.role !== Role.ADMIN && postFound.userId !== user.userId)
      throw new UnauthorizedException({ message: 'User unauthorized' })

    return postFound
  }

  async update(id: number, updatePostDto: UpdatePostDto, user: any) {
    await this.findOne(id, user)

    await this.postsRepository.update(id, { ...updatePostDto })

    return { msg: `Post updated successfully` }
  }

  async remove(id: number, user: any) {
    await this.findOne(id, user);

    await this.postsRepository.delete(id);

    return { msg: `Post deleted successfully` }
  }
}


