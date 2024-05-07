import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { ActiveUser } from 'src/common/decorators/activeUser.decorator';

@UseGuards(AuthGuard, RolesGuard) @Roles(Role.USER)
@Controller('post')

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
  findOne(@Param('id') id: number) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.postsService.remove(id);
  }
}
