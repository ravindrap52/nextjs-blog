"use client";

import { useQuery } from "@tanstack/react-query";
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
    <article className="p-4">
      <h1 className="text-3xl font-bold mb-4">{data?.title}</h1>
      <p className="text-lg text-gray-700">{data?.body}</p>
    </article>
  );
}
