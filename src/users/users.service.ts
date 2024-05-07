import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { InjectRepository } from "@nestjs/typeorm";
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  async create({ username, password }: CreateUserDto) {
    const pass = await hash(password, 10)

    await this.userRepository.save({ username: username, password: pass })

    return { msg: `User ${username} created successfully` }
  }

  async findAll() {
    return await this.userRepository.find()
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id })

    if (!user) throw new BadRequestException('User not found')

    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const result = await this.userRepository.update(id, updateUserDto)

    if (result.affected === 0) return { msg: 'User not updated' }

    return { msg: `User updated successfully` }
  }

  async remove(id: number) {
    const result = await this.userRepository.delete(id)

    if (result.affected === 0) return { msg: 'User not removed' }

    return { msg: `User removed successfully` }
  }

  async findOneByUsername(username: string) {
    //return await this.userRepository.findOneBy({ username });
    return this.userRepository.findOne({
      where: { username },
      select: ['id', 'username', 'password', 'role']
    })
  }
}
