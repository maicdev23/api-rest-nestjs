import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProfileService {

  constructor(
    @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(id: number, createProfileDto: CreateProfileDto) {
    const user = await this.userRepository.findOneBy({id})    
    
    if(!user) throw new BadRequestException('Post not found')

    const saveProfile = await this.profileRepository.save(createProfileDto)
    user.profile = saveProfile
    await this.userRepository.save(user)

    return { msg: `User profile created successfully`}
  }

  async findAll() {
    return await this.profileRepository.find();
  }

  async findOne(id: number) {
    const userFound = await this.profileRepository.findOneBy({id});
      
    if(!userFound) throw new BadRequestException('Profile not found')
      
    return userFound
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    const result = await this.profileRepository.update(id, updateProfileDto)
      
    if(result.affected === 0) return { msg: 'User profile not updated'}

    return { msg: `User profile updated successfully`}
  }

  async remove(id: number) {
    const response = await this.profileRepository.delete(id)
      
    if(response.affected === 0) return { msg: 'User profile not removed' }
    
    return { msg: `User profile removed successfully`}
  }
}
