import { Types } from "mongoose";

export type TBlog = {
  title: string;
  content: string;
  author: Types.ObjectId;
  isPublished: boolean;
};
export type TBlogs = {
  _id: string;
  title: string;
  content: string;
  author: TUser;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
};
