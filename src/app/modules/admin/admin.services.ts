import { RegisteredUser } from "../auth/auth.model";
import { Blog } from "../blog/blog.model";

// block user
const blockUserIntoDb = async (id: string) => {
  const result = await RegisteredUser.findByIdAndUpdate(
    id,
    { isBlocked: true },
    {
      new: true,
    },
  );
  return result;
};
// delete blog
const deleteBlogFromDb = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const adminServices = {
  blockUserIntoDb,
  deleteBlogFromDb,
};
