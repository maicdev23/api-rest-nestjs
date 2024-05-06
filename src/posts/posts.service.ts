import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,

    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  async create(createPostDto: CreatePostDto) {

    const user = await this.userRepository.findOneBy({ id: createPostDto.user })

    if (!user) throw new BadRequestException('User not found')

    return await this.postsRepository.save({ ...createPostDto, user })
  }

  async findAll() {
    return await this.postsRepository.find(); //{ relations: ['user'] }
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
