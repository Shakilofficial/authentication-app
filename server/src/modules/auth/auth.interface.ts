export interface IAuth {
  username: string;
  password: string;
}

export interface IJwtPayload {
  userId: string;
  username: string;
}
