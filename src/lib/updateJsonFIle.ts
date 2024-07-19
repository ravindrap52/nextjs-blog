import fs from "node:fs/promises";
import path from "path";
import { BlogItem } from "@/lib/tsUtils";

const fileLocation = path.resolve(process.cwd(), "src", "data", "blogs.json");

export async function updateBlogPosts(newBlogPost: BlogItem) {
  try {
    // Read the existing file data
    const data = await fs.readFile(fileLocation, "utf8");

    // Parse existing JSON data
    const jsonData = JSON.parse(data);

    // Use the spread operator to update or add the post
    const updatedPosts = jsonData.posts.map((post: BlogItem) =>
      post.id === newBlogPost.id ? { ...post, ...newBlogPost } : post
    );

    // Check if the post needs to be added (i.e., if it wasn't found)
    const postExists = jsonData.posts.some(
      (post: BlogItem) => post.id === newBlogPost.id
    );
    if (!postExists) {
      updatedPosts.push(newBlogPost);
    }

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
}
