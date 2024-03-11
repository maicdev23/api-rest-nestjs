import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,

    private usersService: UsersService
  ) {}

  async create(createPostDto: CreatePostDto) {
    try {
      const userFound = await this.usersService.findOne(createPostDto.authorId)
      if(!userFound) return { msg: 'User not found'}

      this.postsRepository.save(createPostDto)
      return { msg: `Post of ${createPostDto.title} created successfully`}
    } catch (error) {
      return { msg: error.message }
    }
  }

  findAll() {
    return this.postsRepository.find({ relations: ['author']});
  }

  async findOne(id: number) {
    return await this.postsRepository.findOneBy({id})
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.postsRepository.update(id, updatePostDto)
    return { msg: `Post ${id} updated successfully`}
  }

  async remove(id: number) {
    await this.postsRepository.delete(id)
    return { msg: `Post ${id} deleted successfully` };
  }
}
