import { NextRequest, NextResponse } from "next/server";
import { updateJsonFile } from "@/lib/updateJsonFile";

/**
 * This method will create a new blog.
 *
 * @param tile string - blog title.
 * @param body string - content of the blog.
 */
export async function POST(request: NextRequest) {
  try {
    const { title, body } = await request.json();
    // we need to use zod or yup for schema validation
    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    if (!body) {
      return NextResponse.json({ error: "Body is required" }, { status: 400 });
    }
    const newPost = { title, body, id: Date.now() };
    // updating the json file with the new blog
    updateJsonFile(newPost);
    return NextResponse.json(newPost);
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
