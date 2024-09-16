import { Module } from '@nestjs/common';
import { EstudianteModule } from './estudiante/estudiante';
import { UsersModule } from './users/users.module';

import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfileModule } from './profile/profile.module';
import { PublicacionModule } from './publicacion/publicacion.module';
import { AuthModule } from './auth/auth.module';
import { ComentarioModule } from './comentario/comentario.module';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [

    ConfigModule.forRoot({ isGlobal: true }),

    EstudianteModule,

    TypeOrmModule.forRoot(
      {
        type: 'postgres',
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: 5432, ssl: true,
        autoLoadEntities: true,
        synchronize: true,
      }
    ),

    UsersModule,

    ProfileModule,

    PublicacionModule,

    AuthModule,

    ComentarioModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }