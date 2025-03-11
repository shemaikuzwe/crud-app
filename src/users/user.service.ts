import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private db: PrismaService) {}
  async getUsers() {
    const users = await this.db.user.findMany();
    return users;
  }
  async createUser(user: Pick<User, 'email' | 'name'>) {
    try {
      await this.db.user.create({
        data: {
          email: user.email,
          name: user.name,
        },
      });
      return {
        message: 'User created',
      };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code == 'P2002') {
          throw new HttpException('Email already exits', HttpStatus.FOUND);
        }
      }
      throw err;
    }
  }
}
