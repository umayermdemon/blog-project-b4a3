import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.services";
import httpStatus from "http-status";

const registerUser = catchAsync(async (req, res) => {
  const result = await authServices.registerUserIntoDb(req.body);
  sendResponse(res, {
    success: true,
    message: `${result?.role} registered successfully`,
    statusCode: httpStatus.CREATED,
    data: result,
  });
});
const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);
  sendResponse(res, {
    success: true,
    message: "Logged in successfully",
    statusCode: 200,
    data: result,
  });
});

export const authControllers = {
  registerUser,
  loginUser,
};
