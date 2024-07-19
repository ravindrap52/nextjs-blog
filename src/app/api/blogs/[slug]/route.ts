import { NextResponse } from "next/server";
import { getBlogPosts } from "@/lib/getBlogPosts";
import { BlogItems } from "@/lib/tsUtils";
/**
 * This method will find and return the blog based on the blog id.
 *
 * @param slug string - blogId.
 */
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const blogId = Number(params.slug);
  try {
    const blogPosts: BlogItems = await getBlogPosts();
    const blog = blogPosts.find((blog) => blog.id === blogId);

    if (!blog) {
      return new NextResponse("not found", { status: 404 });
    }

    return NextResponse.json({
      blog,
    });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
