import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RegisteredUser } from "../auth/auth.model";

import httpStatus from "http-status";
import { adminServices } from "./admin.services";
import { Blog } from "../blog/blog.model";

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const user = await RegisteredUser.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  if (user?.role !== "user") {
    throw new AppError(httpStatus.FORBIDDEN, "Can not block an admin");
  }
  if (user?.isBlocked === true) {
    throw new AppError(httpStatus.BAD_REQUEST, "This user is already blocked");
  }
  await adminServices.blockUserIntoDb(userId);
  sendResponse(res, {
    success: true,
    message: "User blocked successfully",
    statusCode: 200,
  });
});
const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }

  await adminServices.deleteBlogFromDb(id);
  sendResponse(res, {
    success: true,
    message: "Blog deleted successfully",
    statusCode: 200,
  });
});

export const adminControllers = {
  blockUser,
  deleteBlog,
};
