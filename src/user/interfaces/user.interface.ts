export interface IUser {
  id: number;
  username: string;
  email?: string;
}

export type IUserPartial = Partial<IUser>;
