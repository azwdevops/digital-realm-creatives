import { dbConnect } from "@/lib/dbConnect";
import { Post } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { slug } = params;
  try {
    dbConnect();
    const post = await Post.findOne({ slug });
    console.log(post);
    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch post");
  }
};

export const DELETE = async (req, { params }) => {
  const { slug } = params;
  try {
    dbConnect();
    await Post.deleteOne({ slug });
    return NextResponse.json("Post deleted");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete post");
  }
};
