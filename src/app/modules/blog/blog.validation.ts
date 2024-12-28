import { z } from "zod";

const createBlogValidations = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required" }),
    content: z.string({ required_error: "Content is required" }),
    author: z.string(),
  }),
});

export const blogValidations = {
  createBlogValidations,
};
