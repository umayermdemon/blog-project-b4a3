import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../errors/AppError";
import catchAsync from "../utils/catchAsync";
import httpStatus from "http-status";
import config from "../config";
import { RegisteredUser } from "../modules/auth/auth.model";
import { TUserRole } from "../modules/auth/auth.interface";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req?.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }
    const decoded = jwt.verify(
      token,
      config.jwt_access_token as string,
    ) as JwtPayload;
    const { email, role } = decoded;
    const user = await RegisteredUser.isUserExistsByEmail(email);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    // check blocked user
    const isBlocked = user?.isBlocked;
    if (isBlocked === true) {
      throw new AppError(httpStatus.UNAUTHORIZED, "This user is blocked");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }
    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
