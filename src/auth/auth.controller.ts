import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { RolesGuard } from './guard/roles.guard';
import { ActiveUser } from 'src/common/decorators/activeUser.decorator';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ) { }

    @Post()
    login(@Body() loginDTO: LoginDTO) {
        return this.authService.login(loginDTO)
    }

    @Get()
    @Roles(Role.USER)
    @UseGuards(AuthGuard, RolesGuard)
    main(@ActiveUser() user: any) {
        return user
    }
}
