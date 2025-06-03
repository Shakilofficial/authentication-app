import mongoose, { Schema } from "mongoose";
import { IShop, ShopModel } from "./shop.interface";

const shopSchema = new Schema<IShop, ShopModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Shop = mongoose.model<IShop, ShopModel>("Shop", shopSchema);
