/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import config from "../config";
import { IJwtPayload } from "../modules/auth/auth.interface";
import { ApiError } from "../utils/ApiError";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized");

  try {
    const decoded = jwt.verify(token, config.jwt_access_secret) as IJwtPayload;
    req.user = decoded;
    next();
  } catch (error: any) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid or expired token");
  }
};

export default auth;
