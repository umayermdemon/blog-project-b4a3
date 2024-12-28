/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { userRole } from "./auth.const";

export interface TRegisterUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  isBlocked: boolean;
}

export interface UserModel extends Model<TRegisterUser> {
  isUserExistsByEmail(email: string): Promise<TRegisterUser>;
  isPasswordMatched(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TLoginUser = {
  email: string;
  password: string;
};

export type TUserRole = keyof typeof userRole;
