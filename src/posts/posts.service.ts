import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { Role } from 'src/common/enums/role.enum';
import { Tipo } from 'src/tipo/entities/tipo.entity';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,

    @InjectRepository(Tipo) private readonly tipoRepository: Repository<Tipo>,
  ) { }

  async create(createPostDto: CreatePostDto, user: any) {

    const tipo = await this.tipoRepository.findOneBy({ id: createPostDto.tipo })
    if (!tipo) throw new BadRequestException('User not found')

    return await this.postsRepository.save({ ...createPostDto, tipo, userId: user.userId })
  }

  async findAll(user: any) {
    if (user.role === Role.ADMIN) return await this.postsRepository.find()

    return await this.postsRepository.find({
      where: { userId: user.userId },
    }); //{ relations: ['user'] }
  }

  async findOne(id: number) {
    const userFound = await this.postsRepository.findOneBy({ id })

    if (!userFound) throw new BadRequestException('Post not found')

    return userFound
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postsRepository.findOneBy({ id })

    if (!post) throw new BadRequestException('Post not found')

    await this.postsRepository.update(id, { context: updatePostDto.context })

    return { msg: `Post updated successfully` }
  }

  async remove(id: number) {
    const result = await this.postsRepository.delete(id)

    if (result.affected === 0) throw new BadRequestException('Post not removed')

    return { msg: `Post deleted successfully` };
  }
}
