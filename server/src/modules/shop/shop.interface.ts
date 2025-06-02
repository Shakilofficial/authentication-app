import { Document, Model } from 'mongoose';

export interface IShop extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ShopModel extends Model<IShop> {}
