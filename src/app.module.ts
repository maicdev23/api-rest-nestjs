import { Module } from '@nestjs/common';
import { EstudianteModule } from './estudiante/estudiante';
import { UsersModule } from './users/users.module';

import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    EstudianteModule,

    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'service_rest',
        autoLoadEntities: true,
        synchronize: true,
      }
    ),

    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
