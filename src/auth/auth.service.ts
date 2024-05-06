import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async login({ username, password }: LoginDTO) {
        const user = await this.userService.findOneByUsername(username)

        if (!user) throw new UnauthorizedException('Invalid credentials')

        const match = await compare(password, user.password)
        if (!match) throw new UnauthorizedException('Invalid credentials')

        const payload = { userId: user.id, role: user.role }

        const token = await this.jwtService.signAsync(payload)

        return { msg: 'Bienvenido', token, auth: true };
    }
}
