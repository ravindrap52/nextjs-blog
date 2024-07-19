import { NextResponse } from "next/server";
import { BlogItems } from "@/lib/tsUtils";
import fs from "fs";
import path from "path";

// Helper function to read the JSON file from the filesystem
async function getBlogPosts(): Promise<BlogItems> {
  const filePath = path.resolve(process.cwd(), "src", "data", "blogs.json");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { posts } = JSON.parse(fileContent);
  return posts;
}

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
