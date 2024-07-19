import { BlogItems } from "@/lib/tsUtils";
import fs from "fs";
import path from "path";

export async function getBlogPosts(): Promise<BlogItems> {
    const filePath = path.resolve(process.cwd(), "src", "data", "blogs.json");
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { posts } = JSON.parse(fileContent);
    return posts;
  }