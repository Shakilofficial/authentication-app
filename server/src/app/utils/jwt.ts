import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";
import { IJwtPayload } from "../modules/auth/auth.interface";

export const createToken = (
  jwtPayload: IJwtPayload,
  secret: Secret,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  } as SignOptions);
};

export const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};
