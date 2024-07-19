import fs from "node:fs/promises";
import path from "path";
import { BlogItem } from "@/lib/tsUtils";

const fileLocation = path.resolve(process.cwd(), "src", "data", "blogs.json");

/**
 * This method will read the and update the json file with new blog post.
 *
 * @param newBlogPost Object - containing id, title and body
 */
export async function updateJsonFile(newBlogPost: BlogItem) {
  try {
    // reading file data
    const data = await fs.readFile(fileLocation, "utf8");

    const jsonData = JSON.parse(data);

    const updatedPosts = jsonData.posts.map((post: BlogItem) =>
      post.id === newBlogPost.id ? { ...post, ...newBlogPost } : post
    );

    const postExists = jsonData.posts.some(
      (post: BlogItem) => post.id === newBlogPost.id
    );
    if (!postExists) {
      updatedPosts.push(newBlogPost);
    }

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
