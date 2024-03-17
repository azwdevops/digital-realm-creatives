import { dbConnect } from "./dbConnect";
import { Post, User } from "./models";
import { unstable_noStore as noStore } from "next/cache";

export const getPosts = async () => {
  try {
    dbConnect();
    const posts = await Post.find();
    return posts;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch posts");
  }
};

export const getPost = async (slug) => {
  try {
    dbConnect();
    const post = await Post.findOne({ slug });
    return post;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch post");
  }
};

export const getUsers = async (id) => {
  try {
    dbConnect();
    const users = await User.find(id);
    return users;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch posts");
  }
};
export const getUser = async (id) => {
  noStore();
  try {
    dbConnect();
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch posts");
  }
};
