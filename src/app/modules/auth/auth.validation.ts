import { z } from "zod";

const registerValidations = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z.string({ required_error: "Email is required" }).email(),
    password: z.string().min(6).max(20),
  }),
});
const loginValidations = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }).email(),
    password: z.string().min(6).max(20),
  }),
});

export const authValidations = {
  registerValidations,
  loginValidations,
};
