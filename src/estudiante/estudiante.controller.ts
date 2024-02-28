import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';

@Controller('user')
export class EstudianteController {

    constructor(private estudianteService: EstudianteService) { }

    @Get()
    getUsers() {
        return this.estudianteService.findAll()
    }

    @Post()
    addUser(@Body() newUser: any) {
        return this.estudianteService.save(newUser.name)
    }

    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.estudianteService.findOne(id)
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.estudianteService.removeOne(id)
    }
}
