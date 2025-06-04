/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/appError";
import { IJwtPayload } from "../modules/auth/auth.interface";
import { ApiError } from "../utils/ApiError";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized!");
  }

  try {
    const decoded = jwt.verify(token, config.jwt_access_secret) as IJwtPayload;
    req.user = decoded;
    next();
  } catch (error: any) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid or expired token");
  }
};

export default auth;
