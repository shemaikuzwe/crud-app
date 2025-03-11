import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private db: PrismaService) {}
  async getUsers() {
    const users = await this.db.user.findMany();
    return users;
  }
  async getUserById(id: string) {
    const user = await this.db.user.findFirst({ where: { id } });
    if (!user) throw new HttpException('user not found', 404);
    return user;
  }
  async updateUser(id: string, user: Prisma.UserUpdateInput) {
    await this.db.user.update({ where: { id }, data: user });
    return {
      message: 'User updated',
    };
  }
  async createUser(user: Prisma.UserCreateInput) {
    try {
      await this.db.user.create({
        data: user,
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

  async deleteUser(id: string) {
    await this.db.user.delete({ where: { id } });
    return {
      message: 'User deleted',
    };
  }
}
