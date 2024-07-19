import { BlogPost } from "@/lib/tsUtils";
import { endpoint } from "@/lib/constants";

export default async function CreateBlogPost(data: BlogPost) {
  const response = await fetch(`${endpoint}/createBlogPost`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}
