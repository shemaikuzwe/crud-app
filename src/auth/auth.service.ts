import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUser } from 'src/utils/types/type';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private db: PrismaService,
  ) {}
  signInUser(user: { email: string; name: string; id: string }) {
    return this.jwtService.sign(user);
  }
  async loginUser({ email, password }: LoginUser) {
    const user = await this.findUser(email);
    if (user.password !== password) {
      throw new HttpException('Invalid password', 401);
    }
    return this.signInUser({ email, name: user.name, id: user.id });
  }
  async findUser(email: string) {
    const user = await this.db.user.findFirst({ where: { email } });
    if (!user) throw new HttpException('User not Found', 401);
    return user;
  }
}
