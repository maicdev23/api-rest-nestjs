import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

import { User } from './entities/user.entity';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { username, password, role = Role.USER } = createUserDto;

    const findUser = await this.userRepository.findOne({ where: { username } });

    if (findUser) throw new ConflictException({ message: 'User already exists' });

    try {
      const pass = await hash(password, 10);

      const user = { username, password: pass, role };

      await this.userRepository.save(user);

      return { msg: `User ${username} created successfully` };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    return await this.userRepository.find()
  }

  async findOne(id: string, user: any) {
    const userFound = await this.userRepository.findOneBy({ id })

    if (!userFound) throw new BadRequestException({ message: 'User not found' })

    if (user.role !== Role.ADMIN && userFound.id !== user.userId)
      throw new UnauthorizedException({ message: 'User unauthorized' })

    return userFound
  }

  async update(id: string, updateUserDto: UpdateUserDto, user: any) {
    await this.findOne(id, user);

    await this.userRepository.update(id, updateUserDto)

    return { msg: `User updated successfully` }
  }

  async remove(id: string, user: any) {
    await this.findOne(id, user);

    await this.userRepository.delete(id)

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