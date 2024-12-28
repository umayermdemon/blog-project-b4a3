import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blogServices } from "./blog.services";

const createBlog = catchAsync(async (req, res) => {
  const result = await blogServices.createBlogIntoDb(req.body);
  sendResponse(res, {
    success: true,
    message: "Blog created successfully",
    statusCode: 200,
    data: result,
  });
});
const getAllBlog = catchAsync(async (req, res) => {
  const result = await blogServices.getAllBlogFromDb();
  sendResponse(res, {
    success: true,
    message: "All blog are retrieved successfully",
    statusCode: 200,
    data: result,
  });
});
const getSingleBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await blogServices.getSingleBlogFromDb(id);
  sendResponse(res, {
    success: true,
    message: "Blog is retrieved successfully",
    statusCode: 200,
    data: result,
  });
});

export const blogControllers = {
  createBlog,
  getAllBlog,
  getSingleBlog,
};
