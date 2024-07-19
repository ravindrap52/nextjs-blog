import { NextResponse } from "next/server";
import { BlogItems } from "@/lib/tsUtils";
import { getBlogPosts } from "@/lib/getBlogPosts";


export const dynamic = "force-dynamic";

/**
 * This will return the list of the available blogs.
 */
export async function GET() {
  try {
    const blogPosts: BlogItems = await getBlogPosts();
    const response = NextResponse.json({ blogPosts });
    response.headers.set('Cache-Control', 'no-store');
    return response;
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
