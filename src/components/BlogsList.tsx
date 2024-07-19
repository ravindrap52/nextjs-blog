"use client";

import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "@/lib/getBlogs";
import Link from "next/link";

export default function BlogsList() {
  const {
    data: blogs,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["blog"],
    queryFn: getBlogs,
    refetchOnWindowFocus: true,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return <div>Some thing went wrong...</div>;
  }
  return (
    <>
      <h1>Posts</h1>
      <ul>
        {blogs?.map((blog) => {
          return (
            <li key={blog.id}>
              <Link href={`/admin/${blog.id}`}> {blog.title} </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
