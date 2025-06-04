import { StatusCodes } from "http-status-codes";
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { IJwtPayload } from "./auth.interface";
import { authService } from "./auth.service";

const signUp = catchAsync(async (req, res) => {
  const { accessToken, refreshToken } = await authService.signUp(req.body);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.node_env === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "User created successfully!",
    data: {
      accessToken,
    },
  });
});

const signIn = catchAsync(async (req, res) => {
  const { accessToken, refreshToken } = await authService.signIn(req.body);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.node_env === "production",
    sameSite: "none",
    maxAge: req.body.rememberMe ? 7 * 24 * 60 * 60 * 1000 : 30 * 60 * 1000,
  });
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User signed in successfully!",
    data: {
      accessToken,
    },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await authService.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Token refreshed successfully!",
    data: result,
  });
});

const getProfile = catchAsync(async (req, res) => {
  const user = await authService.getProfile(req.user as IJwtPayload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User profile fetched successfully!",
    data: user,
  });
});

export const authController = {
  signUp,
  signIn,
  refreshToken,
  getProfile,
};
