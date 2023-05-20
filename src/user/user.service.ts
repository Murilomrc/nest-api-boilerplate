import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { EntityNotFoundError } from 'src/common/exceptions/error.exception';
import { FindAllParams } from 'src/common/interfaces/request';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  async findAll(params: FindAllParams): Promise<User[]> {
    return this.userRepository.findAll(params);
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new EntityNotFoundError();
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new EntityNotFoundError();
    }
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new EntityNotFoundError();
    }
    return this.userRepository.remove(id);
  }
}
