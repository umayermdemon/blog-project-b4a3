import AppError from "../../errors/AppError";
import { RegisteredUser } from "../auth/auth.model";
import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";
import httpStatus from "http-status";

const createBlogIntoDb = async (payload: TBlog, email: string) => {
  const author = await RegisteredUser.findOne({ email: email });
  const result = (
    await Blog.create({ ...payload, author: author?._id })
  ).populate("author");
  return result;
};
const getAllBlogFromDb = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };
  // search
  let search = "";
  if (query?.search) {
    search = query?.search as string;
  }
  const searchQuery = Blog.find({
    $or: ["title", "content"].map(field => ({
      [field]: { $regex: search, $options: "i" },
    })),
  });
  const excludeFields = ["search", "sortBy", "sortOrder"];
  excludeFields.forEach(el => delete queryObj[el]);

  // filter
  const filterQuery = searchQuery.find(queryObj).populate("author");
  // sort
  let sortBy = "-createdAt";
  if (query?.sortBy) {
    sortBy = query?.sortBy as string;
  }
  const sortByQuery = filterQuery.sort(sortBy);
  // sort order
  const order = query?.sortOrder === "desc" ? -1 : 1;
  const sortOrderQuery = await sortByQuery.sort({ createdAt: order });
  return sortOrderQuery;
};
const getSingleBlogFromDb = async (id: string) => {
  const result = await Blog.findById(id).populate("author");
  return result;
};
const updateBlogIntoDb = async (
  id: string,
  payload: Partial<TBlog>,
  userBlogEmail: string,
) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }
  const registeredUserEmail = await RegisteredUser.findById(blog?.author);
  if (userBlogEmail !== registeredUserEmail?.email) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized to update this blog",
    );
  }
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate("author");
  return result;
};
const deleteBlogFromDb = async (id: string, userBlogEmail: string) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }
  const registeredUserEmail = await RegisteredUser.findById(blog?.author);
  if (userBlogEmail !== registeredUserEmail?.email) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized to delete this blog",
    );
  }
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const blogServices = {
  createBlogIntoDb,
  getAllBlogFromDb,
  getSingleBlogFromDb,
  updateBlogIntoDb,
  deleteBlogFromDb,
};
