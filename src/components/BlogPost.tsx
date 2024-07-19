"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { fetchBlog } from "@/lib/getBlog";

export default function BlogPost({ id }: { id: number }) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlog(Number(id)),
    refetchOnWindowFocus: true,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Some thing went wrong...</div>;
  return (
    <div className="w-3/4 p-6">
      <div className="mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{data?.title}</h1>
          <p>{data?.body}</p>
        </div>
      </div>
      <div>
        <Link
          href="/blogs"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
