import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,

    private usersService: UsersService
  ) {}

  async create(createPostDto: CreatePostDto) {
    const userFound = await this.usersService.findOne(createPostDto.authorId)

    if(!userFound) throw new BadRequestException('User not found')

    this.postsRepository.save(createPostDto)
    return { msg: `Post created successfully`}
  }

  async findAll() {
    return await this.postsRepository.find(); //{ relations: ['author']}}
  }

  async findOne(id: number) {
    const userFound = await this.postsRepository.findOneBy({id})
    
    if(!userFound) throw new BadRequestException('Post not found')

    return userFound
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const result = await this.postsRepository.update(id, updatePostDto)

    if(result.affected === 0) return { msg: 'Post not updated'}

    return { msg: `Post updated successfully`}
  }

  async remove(id: number) {
    const result = await this.postsRepository.delete(id)

    if(result.affected === 0) return { msg: 'Post not removed'}
    
    return { msg: `Post deleted successfully` };
  }
}
