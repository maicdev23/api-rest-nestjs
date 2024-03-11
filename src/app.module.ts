import { Module } from '@nestjs/common';
import { EstudianteModule } from './estudiante/estudiante';
import { UsersModule } from './users/users.module';

import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfileModule } from './profile/profile.module';
import { PostsModule } from './posts/posts.module';

import * as dotenv from 'dotenv'

dotenv.config()

@Module({
  imports: [
    EstudianteModule,

    TypeOrmModule.forRoot(
      {
        type: 'postgres',
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: 5432,
        ssl: true,
        autoLoadEntities: true,
        synchronize: true,
      }
    ),

    UsersModule,

    ProfileModule,

    PostsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
