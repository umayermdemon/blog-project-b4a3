import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";

const createBlogIntoDb = async (payload: TBlog) => {
  const result = await Blog.create(payload);
  return result;
};
const getAllBlogFromDb = async () => {
  const result = await Blog.find().populate("author");
  return result;
};
const getSingleBlogFromDb = async (id: string) => {
  const result = await Blog.findById(id).populate("author");
  return result;
};

export const blogServices = {
  createBlogIntoDb,
  getAllBlogFromDb,
  getSingleBlogFromDb,
};
