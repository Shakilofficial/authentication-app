import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import { ApiError } from "../../utils/ApiError";
import { IUser } from "../user/user.interface";
import User from "../user/user.model";
import { IAuth, IJwtPayload } from "./auth.interface";
import config from "../../config";
import { createToken } from "../../utils/jwt";

const signUp = async (userData: IUser) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { username, password, shopNames } = userData;
    const isExist = await User.findByUsername(username)
    if (isExist) {
      throw new ApiError(StatusCodes.CONFLICT, 'Username already exists');
    }

    // Validate unique shop names
    if (shopNames && shopNames.length > 0) {
      const existingShops = await User.find({ shopNames: { $in: shopNames } });
      if (existingShops.length > 0) {
        throw new ApiError(StatusCodes.CONFLICT, 'One or more shop names are already taken');
      }
    }

    const user = await User.create([{ username, password, shopNames }], { session });
    const jwtPayload: IJwtPayload = {
      userId: user[0]._id.toString(),
      username: user[0].username,
    };
    const accessToken = createToken(jwtPayload, config.jwt_access_secret, config.jwt_access_expires_in);

    await session.commitTransaction();
    return { user: user[0], accessToken };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const signIn = async (userData: IAuth & { rememberMe?: boolean }) => {
  const { username, password, rememberMe } = userData;
  const user = await User.findByUsername(username);
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }

  const isPasswordValid = await User.isPasswordMatched(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }

  const jwtPayload: IJwtPayload = {
    userId: user._id.toString(),
    username: user.username,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret,
    rememberMe ? '7d' : config.jwt_access_expires_in,
  );

  return { accessToken, user: { _id: user._id, username: user.username, shops: user.shopNames } };
};

const getProfile = async (authUser: IJwtPayload) => {
  const user = await User.checkUserExist(authUser.userId);
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }
  return user.populate('shops');
};



export const authService = {
  signUp,
  signIn,
  getProfile,
};