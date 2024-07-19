import { NextRequest, NextResponse } from "next/server";
import { BlogItems, BlogItem } from "@/lib/tsUtils";
import blogs from "@/data/blogs.json";
import { updateBlogPosts } from "@/lib/updateJsonFIle";

export async function PATCH(request: NextRequest) {
  try {
    const blogPosts: BlogItems = blogs.posts;
    const { id, title, body } = await request.json();

    // Validate input
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    if (!title && !body) {
      return NextResponse.json(
        { error: "At least one of 'title' or 'body' is required" },
        { status: 400 }
      );
    }

    // Find the post by ID
    const postIndex = blogPosts.findIndex((post: BlogItem) => post.id === id);
    if (postIndex === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Update the post
    if (title) blogPosts[postIndex].title = title;
    if (body) blogPosts[postIndex].body = body;

    // Assuming you would save the updated blogs back to your storage here
    updateBlogPosts(blogPosts[postIndex]);
    return NextResponse.json(blogPosts[postIndex]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
