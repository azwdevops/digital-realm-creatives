"use server";

import { revalidatePath } from "next/cache";
import { dbConnect } from "./dbConnect";
import { Post, User } from "./models";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";

export const addPost = async (previousState, formData) => {
  const { title, description, slug, userId, img } =
    Object.fromEntries(formData);
  try {
    dbConnect();
    const newPost = new Post({ title, description, slug, userId, img });
    await newPost.save();
    console.log("saved to db");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const addUser = async (previousState, formData) => {
  const { username, email, password, img } = Object.fromEntries(formData);
  try {
    dbConnect();
    const newUser = new User({ username, email, password, img });
    await newUser.save();
    console.log("saved to db");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const deletePost = async (formData) => {
  const { postId } = Object.fromEntries(formData);
  try {
    dbConnect();
    await Post.findByIdAndDelete(postId);
    console.log("deleted from db");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const deleteUser = async (formData) => {
  const { userId } = Object.fromEntries(formData);
  try {
    dbConnect();
    await Post.deleteMany({ userId });
    await User.findByIdAndDelete(userId);
    console.log("deleted from db");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const handleGoogleLogin = async () => {
  "use server";
  await signIn("google");
};
export const handleLogout = async () => {
  "use server";
  await signOut();
};

export const register = async (previousState, formData) => {
  const { username, email, password, confirm_password, img } =
    Object.fromEntries(formData);
  if (password !== confirm_password) {
    return { error: "Passwords do not match" };
  }
  try {
    dbConnect();
    const user = await User.findOne({ username });
    if (user) {
      return { error: "username already exists" };
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
    });
    await newUser.save();
    console.log("saved to db");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
export const login = async (previousState, formData) => {
  const { username, password } = Object.fromEntries(formData);
  try {
    await signIn("credentials", { username, password });
  } catch (error) {
    console.log(error);
    if (error.message.includes("CredentialsSignin")) {
      return { error: "Wrong username or password" };
    }
    throw error;
  }
};
