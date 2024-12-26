import { z } from "zod";

const createUserValidations = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z.string({ required_error: "Email is required" }).email(),
    password: z.string(),
    role: z.enum(["user", "admin"]),
  }),
});

export const userValidations = {
  createUserValidations,
};
