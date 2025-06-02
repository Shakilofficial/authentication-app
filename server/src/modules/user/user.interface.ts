import { Document, Model, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  password: string;
  shopNames: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserModel extends Model<IUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

  findByUsername(username: string): Promise<IUser | null>;
  checkUserExist(userId: string): Promise<IUser | null>;
}