import { PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  lastname: string;
}
