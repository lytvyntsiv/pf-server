import express from "express";
import AuthController from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validationMiddleware } from "../middleware/validation.middleware";
import { loginSchema } from "../validators/auth.validator";

const AuthRoutes = express.Router();

AuthRoutes.get("/nonce", AuthController.generateNonce);

AuthRoutes.post(
  "/login",
  validationMiddleware(loginSchema),
  AuthController.login,
);

AuthRoutes.get("/me", authMiddleware, AuthController.me);

export default AuthRoutes;
