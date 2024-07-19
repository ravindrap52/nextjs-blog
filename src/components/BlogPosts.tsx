"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "@/lib/getBlogs";

export default function BlogPosts() {
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
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {blogs?.map((blog) => (
        <div key={blog.id} className="flex justify-center">
          <div className="bg-white shadow-md border border-gray-200 rounded-lg w-full mb-5 flex flex-col">
            <div className="p-5 flex-grow flex flex-col">
              <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">
                {blog.title}
              </h5>
              <p className="font-normal text-gray-700 mb-3 flex-grow">
                {blog.body}
              </p>
              <Link
                className=" cursor-pointer mt-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-2 px-4 text-center inline-flex items-center justify-center"
                href={`/blogs/${blog.id}`}
                style={{ width: "120px" }}
              >
                Read more
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
