import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TipoService } from './tipo.service';
import { CreateTipoDto } from './dto/create-tipo.dto';
import { UpdateTipoDto } from './dto/update-tipo.dto';

import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@UseGuards(AuthGuard, RolesGuard) @Roles(Role.ADMIN)
@Controller('tipo')

export class TipoController {

  constructor(
    private readonly tipoService: TipoService
  ) { }

  @Post()
  create(@Body() createTipoDto: CreateTipoDto) {
    return this.tipoService.create(createTipoDto);
  }

  @Get()
  findAll() {
    return this.tipoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tipoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTipoDto: UpdateTipoDto) {
    return this.tipoService.update(id, updateTipoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tipoService.remove(id);
  }
}
