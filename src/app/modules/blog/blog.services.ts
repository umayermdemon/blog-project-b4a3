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
const updateBlogIntoDb = async (id: string, payload: Partial<TBlog>) => {
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate("author");
  return result;
};
const deleteBlogFromDb = async (id: string) => {
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
