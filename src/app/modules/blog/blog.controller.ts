import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blogServices } from "./blog.services";
import httpStatus from "http-status";

const createBlog = catchAsync(async (req, res) => {
  const result = await blogServices.createBlogIntoDb(req.body);
  sendResponse(res, {
    success: true,
    message: "Blog created successfully",
    statusCode: httpStatus.CREATED,
    data: {
      _id: result?._id,
      title: result?.title,
      content: result?.content,
      author: result?.author,
    },
  });
});
const getAllBlog = catchAsync(async (req, res) => {
  const result = await blogServices.getAllBlogFromDb(req?.query);
  sendResponse(res, {
    success: true,
    message: "Blogs fetched successfully",
    statusCode: 200,
    data: result.map(blog => ({
      _id: blog?._id,
      title: blog?.title,
      content: blog?.content,
      author: blog?.author,
    })),
  });
});
const getSingleBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await blogServices.getSingleBlogFromDb(id);
  sendResponse(res, {
    success: true,
    message: "Blog fetched successfully",
    statusCode: 200,
    data: result,
  });
});
const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userBlogEmail = req?.user?.email;

  const result = await blogServices.updateBlogIntoDb(
    id,
    req?.body,
    userBlogEmail,
  );
  sendResponse(res, {
    success: true,
    message: "Blog updated successfully",
    statusCode: 200,
    data: {
      _id: result?._id,
      title: result?.title,
      content: result?.content,
      author: result?.author,
    },
  });
});
const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userBlogEmail = req.user.email;

  const result = await blogServices.deleteBlogFromDb(id, userBlogEmail);
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
