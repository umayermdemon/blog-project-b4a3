import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RegisteredUser } from "../auth/auth.model";
import { Blog } from "./blog.model";
import { blogServices } from "./blog.services";
import httpStatus from "http-status";

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
  const result = await blogServices.getAllBlogFromDb(req?.query);
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
const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userBlogEmail = req.user.email;
  const blog = await Blog.findById(id);
  const registeredUserEmail = await RegisteredUser.findById(blog?.author);
  if (userBlogEmail !== registeredUserEmail?.email) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized to update this blog",
    );
  }
  const result = await blogServices.updateBlogIntoDb(id, req.body);
  sendResponse(res, {
    success: true,
    message: "Blog updated successfully",
    statusCode: 200,
    data: result,
  });
});
const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }
  const result = await blogServices.deleteBlogFromDb(id);
  sendResponse(res, {
    success: true,
    message: "Blog deleted successfully",
    statusCode: 200,
    data: result,
  });
});

export const blogControllers = {
  createBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
