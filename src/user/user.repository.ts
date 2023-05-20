import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { FindAllParams } from 'src/common/interfaces/request';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(params: FindAllParams): Promise<User[]> {
    return this.prisma.user.findMany(params);
  }

  async findOne(id: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async create(createUserDto: CreateUserDto) {
    const user = this.prisma.user.create({
      data: createUserDto,
    });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.prisma.user.update({
      data: updateUserDto,
      where: {
        id,
      },
    });
    return user;
  }

  async remove(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
