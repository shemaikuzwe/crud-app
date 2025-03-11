import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt.guard';
import { Request } from 'express';
import { LoginDTO } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}
  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() user: LoginDTO) {
    return await this.auth.loginUser(user);
  }

  @Get('session')
  @UseGuards(JwtAuthGuard)
  getSession(@Req() req: Request) {
    return req.user;
  }
}
