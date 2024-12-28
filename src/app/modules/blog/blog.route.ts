import { Router } from "express";
import { blogControllers } from "./blog.controller";
import validateRequest from "../../middlewares/validateRequest";
import { blogValidations } from "./blog.validation";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
  "/",
  auth("user"),
  validateRequest(blogValidations.createBlogValidations),
  blogControllers.createBlog,
);
router.get("/", auth("user", "admin"), blogControllers.getAllBlog);
router.get("/:id", auth("user", "admin"), blogControllers.getSingleBlog);
router.patch(
  "/:id",
  auth("user", "admin"),
  validateRequest(blogValidations.updateBlogValidations),
  blogControllers.updateBlog,
);
router.delete("/:id", auth("admin"), blogControllers.deleteBlog);

export const BlogRouter = router;
