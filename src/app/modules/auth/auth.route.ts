import { Router } from "express";
import { authControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { authValidations } from "./auth.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(authValidations.registerValidations),
  authControllers.registerUser,
);
router.post(
  "/login",
  validateRequest(authValidations.loginValidations),
  authControllers.loginUser,
);

export const AuthRouter = router;
