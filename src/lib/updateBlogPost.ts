import { BlogItem, BlogPost } from "@/lib/tsUtils";
import { endpoint } from "@/lib/constants";

/**
 * This method will update the selected blog.
 *
 * @param data object - containing id, title and body
 */
export default async function UpdateBlogPost(data: BlogPost): Promise<BlogItem> {
  const response = await fetch(`${endpoint}/updateBlogPost`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}