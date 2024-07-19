import { endpoint } from "@/lib/constants";
import { BlogItems, BlogItem } from "@/lib/tsUtils";

/**
 * This will return the list of the available blogs.
 */
export async function getBlogs(): Promise<BlogItems> {
  const response = await fetch(`${endpoint}/blogs`, {
    cache: 'no-store',
  });
  let { blogPosts } = await response.json();
  // don't show the full body in list
  blogPosts = blogPosts.map((blogPost: BlogItem) => {
    return {
        ...blogPost,
        body: blogPost.body.substring(0, 50) + (blogPost.body.length > 50 ? '...' : ''),
    }
  })
  return blogPosts;
}
