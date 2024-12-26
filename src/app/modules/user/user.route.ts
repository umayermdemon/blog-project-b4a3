import { Router } from "express";
import { userControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidations } from "./user.validation";

const router = Router();

router.post(
  "/create-user",
  validateRequest(userValidations.createUserValidations),
  userControllers.createUser,
);

export const UserRouter = router;
