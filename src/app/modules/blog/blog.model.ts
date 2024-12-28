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

// pre middleware for isPublished false
blogSchema.pre("find", function (next) {
  this.find({ isPublished: { $ne: false } });
  next();
});
blogSchema.pre("findOne", function (next) {
  this.findOne({ isPublished: { $ne: false } });
  next();
});
blogSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isPublished: { $ne: false } } });
  next();
});

export const Blog = model<TBlog>("Blog", blogSchema);
