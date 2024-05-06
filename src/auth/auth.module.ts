import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { constants } from "../const";

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: constants.jwtsecret,
      signOptions: { expiresIn: "1h" }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
