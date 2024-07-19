import { NextResponse } from "next/server";
import { BlogItems } from "@/lib/tsUtils";
import blogs from "@/data/blogs.json";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const blogPosts: BlogItems = blogs.posts;
    return NextResponse.json({ blogPosts });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
