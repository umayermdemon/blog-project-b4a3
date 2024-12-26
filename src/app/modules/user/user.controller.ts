import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.services";

const createUser = catchAsync(async (req, res) => {
  const result = await userServices.createUserIntoDb(req.body);
  sendResponse(res, {
    success: true,
    message: "User created successfully",
    statusCode: 200,
    data: result,
  });
});

export const userControllers = {
  createUser,
};
