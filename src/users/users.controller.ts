import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ActiveUser } from 'src/common/decorators/activeUser.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Usuario')
@Controller('user')
export class UsersController {

  constructor(
    private readonly usersService: UsersService
  ) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Auth(Role.USER)
  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() user: any) {
    return this.usersService.findOne(id, user);
  }

  @Auth(Role.USER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @ActiveUser() user: any) {
    return this.usersService.update(id, updateUserDto, user);
  }

  @Auth(Role.USER)
  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: any) {
    return this.usersService.remove(id, user);
  }
}
