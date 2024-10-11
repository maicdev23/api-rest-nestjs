import { Module } from '@nestjs/common';
import { EstudianteModule } from './estudiante/estudiante';
import { UsersModule } from './users/users.module';

import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfileModule } from './profile/profile.module';
import { PublicacionModule } from './publicacion/publicacion.module';
import { AuthModule } from './auth/auth.module';
import { ComentarioModule } from './comentario/comentario.module';

import { ConfigModule } from '@nestjs/config';
import { PersonModule } from './person/person.module';

@Module({
  imports: [

    ConfigModule.forRoot({ isGlobal: true }),

    EstudianteModule,

    TypeOrmModule.forRoot(
      {
        type: 'postgres',
        url: process.env.DB_CONN,
        autoLoadEntities: true,
        synchronize: true,
      }
    ),

    UsersModule,

    ProfileModule,

    PublicacionModule,

    AuthModule,

    ComentarioModule,

    PersonModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }