import { model, Schema } from "mongoose";
import { TBlog } from "./blog.interface";

const blogSchema = new Schema<TBlog>(
  {
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    author: {
      type: Schema.Types.ObjectId,
      ref: "RegisteredUser",
      required: true,
    },
    isPublished: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

export const Blog = model<TBlog>("Blog", blogSchema);
