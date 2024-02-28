import { Module } from '@nestjs/common';
import { EstudianteModule } from './estudiante/estudiante';

@Module({
  imports: [EstudianteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
