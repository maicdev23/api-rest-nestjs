import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PostsService } from './publicacion.service';
import { CreatePostDto } from './dto/create-publicacion.dto';
import { UpdatePostDto } from './dto/update-publicacion.dto';
import { Role } from 'src/common/enums/role.enum';
import { ActiveUser } from 'src/common/decorators/activeUser.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Publicación')
@Auth(Role.USER)
@Controller('publicacion')

export class PostsController {

  constructor(
    private readonly postsService: PostsService
  ) { }

  @Post()
  create(@Body() createPostDto: CreatePostDto, @ActiveUser() user: any) {
    return this.postsService.create(createPostDto, user);
  }

  @Get()
  findAll(@ActiveUser() user: any) {
    return this.postsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @ActiveUser() user: any) {
    return this.postsService.findOne(id, user);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto, @ActiveUser() user: any) {
    return this.postsService.update(id, updatePostDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @ActiveUser() user: any) {
    return this.postsService.remove(id, user);
  }
}
