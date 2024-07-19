import { BlogPost } from "@/lib/tsUtils";
import { endpoint } from "@/lib/constants";

export default async function UpdateBlogPost(data: BlogPost) {
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