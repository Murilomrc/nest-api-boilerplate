import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';
import { IsUniqueConstraint } from 'src/common/validators/isUnique.validator';
import { IUserPartial } from '../interfaces/user.interface';

export class CreateUserDto implements IUserPartial {
  @IsNotEmpty()
  @IsString()
  @Validate(IsUniqueConstraint, ['User'])
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @Validate(IsUniqueConstraint, ['User'])
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;
}
