import { NextRequest, NextResponse } from "next/server";
import { updateBlogPosts } from "@/lib/updateJsonFIle";

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
    // Return a JSON response with the validated data
    updateBlogPosts(newPost);
    return NextResponse.json(newPost);
  } catch (error) {
    // Return a JSON response for unexpected errors
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

/* async function updateBlogPosts(fileLocation: string, newBlogPost: BlogItem) {
  try {
    // Read the existing file data
    const data = await fs.readFile(fileLocation, "utf8");

    // Parse existing JSON data
    const jsonData = JSON.parse(data);

    const updatedPosts = [...jsonData.posts, newBlogPost];

    // Create the updated data object
    const updatedData = {
      ...jsonData,
      posts: updatedPosts,
    };

    // Write the updated JSON data back to the file
    await fs.writeFile(
      fileLocation,
      JSON.stringify(updatedData, null, 2),
      "utf8"
    );
    console.log("File updated successfully");
  } catch (err) {
    console.error("Error:", err);
  }
} */
