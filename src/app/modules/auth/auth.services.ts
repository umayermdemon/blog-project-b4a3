import config from "../../config";
import AppError from "../../errors/AppError";
import { TLoginUser, TRegisterUser } from "./auth.interface";
import { RegisteredUser } from "./auth.model";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";

const registerUserIntoDb = async (payload: TRegisterUser) => {
  const result = await RegisteredUser.create(payload);
  return result;
};
const loginUser = async (payload: TLoginUser) => {
  // is user exists
  const user = await RegisteredUser.isUserExistsByEmail(payload?.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // check blocked user
  const isBlocked = user?.isBlocked;
  if (isBlocked === true) {
    throw new AppError(httpStatus.UNAUTHORIZED, "This user is blocked");
  }

  // check password
  const isPasswordMatched = await RegisteredUser.isPasswordMatched(
    payload?.password,
    user?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const token = jwt.sign(jwtPayload, config.jwt_access_token as string, {
    expiresIn: config.jwt_access_expires_in,
  });
  return { token };
};

export const authServices = {
  registerUserIntoDb,
  loginUser,
};
