import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProfileService {

  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(id: number, createProfileDto: CreateProfileDto) {
    const user = await this.userRepository.findOneBy({id})
    
    if(!user) return new Error(`User ${id} not found`)

    const saveProfile = await this.profileRepository.save(createProfileDto)
    user.profile = saveProfile
    this.userRepository.save(user)

    return { msg: `User profile created successfully`}
  }

  async findAll() {
    return this.profileRepository.find();
  }

  findOne(id: number) {
    return this.profileRepository.findOneBy({id});
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    await this.profileRepository.update(id, updateProfileDto)
    return { msg: `User profile updated successfully`}
  }

  async remove(id: number) {
    await this.profileRepository.delete(id)
    return { msg: `User profile deleted successfully`}
  }
}
