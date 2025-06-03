import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { userValidations } from "../user/user.validation";
import { authController } from "./auth.controller";

const router = Router();

router.post(
  "/signup",
  validateRequest(userValidations.signUp),
  authController.signUp
);

router.post(
  "/signin",
  validateRequest(userValidations.signIn),
  authController.signIn
);

router.get("/profile", auth, authController.getProfile);

export const authRoute = router;
