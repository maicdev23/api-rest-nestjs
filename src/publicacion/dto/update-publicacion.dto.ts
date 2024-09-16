import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-publicacion.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) { }
