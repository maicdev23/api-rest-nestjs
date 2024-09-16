import { Module } from '@nestjs/common';
import { PostsService } from './publicacion.service';
import { PostsController } from './publicacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publicacion } from './entities/publicacion.entity';
import { User } from 'src/users/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({

  imports: [TypeOrmModule.forFeature([Publicacion, User]), AuthModule],

  controllers: [PostsController],
  providers: [PostsService],

  exports: [PostsService]

})

export class PublicacionModule { }