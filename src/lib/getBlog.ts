import { endpoint } from "@/lib/constants";
import { BlogItem } from "@/lib/tsUtils";

/**
 * This method will find and return the blog based on the blog id.
 *
 * @param id number - blogId.
 */
export async function fetchBlog(id: number): Promise<BlogItem> {
  const response = await fetch(`${endpoint}/blogs/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const { blog } = await response.json();
  return blog;
}
