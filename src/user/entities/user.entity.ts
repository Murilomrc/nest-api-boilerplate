import { IUser } from '../interfaces/user.interface';

export class User implements IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  name: string;
  lastname: string;
  createdAt: string;
  updatedAt: string;
}
