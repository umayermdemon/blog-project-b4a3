import { Router } from "express";
import auth from "../../middlewares/auth";
import { adminControllers } from "./admin.controller";

const router = Router();

// block user
router.patch("/users/:userId/block", auth("admin"), adminControllers.blockUser);
// delete blog
router.delete("/blogs/:id", auth("admin"), adminControllers.deleteBlog);

export const AdminRouter = router;
