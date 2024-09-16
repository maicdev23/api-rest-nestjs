import { Module } from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { ComentarioController } from './comentario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comentario } from './entities/comentario.entity';
import { Publicacion } from 'src/publicacion/entities/publicacion.entity';

@Module({

  imports: [TypeOrmModule.forFeature([Comentario, Publicacion])],

  controllers: [ComentarioController],
  providers: [ComentarioService],
})
export class ComentarioModule { }
