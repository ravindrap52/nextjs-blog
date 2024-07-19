"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "@/lib/getBlogs";

export default function BlogPosts() {
  const { data: blogs, error, isLoading } = useQuery({
    queryKey: ["blog"],
    queryFn: getBlogs,
    refetchOnWindowFocus: true,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return <div>Some thing went wrong...</div>;
  }
  return (
    <div className="grid gap-4 grid-cols-2 cursor-pointer">
      {blogs?.map((blog) => {
        return (
          <Link
            href={`/blogs/${blog.id}`}
            key={blog.id}
          >
            <div className="rounded overflow-hidden shadow-lg bg-white">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{blog.title}</div>
                <p className="text-gray-700 text-base">{blog.body}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
