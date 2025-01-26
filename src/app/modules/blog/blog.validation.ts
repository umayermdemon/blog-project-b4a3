import { z } from "zod";

const createBlogValidations = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required" }),
    content: z.string({ required_error: "Content is required" }),
  }),
});
const updateBlogValidations = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
  }),
});

export const blogValidations = {
  createBlogValidations,
  updateBlogValidations,
};
