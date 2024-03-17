import { dbConnect } from "@/lib/dbConnect";
import { Post } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    dbConnect();
    const posts = await Post.find();
    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch posts");
  }
};
