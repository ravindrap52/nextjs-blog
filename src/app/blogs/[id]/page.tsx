import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import BlogPost from "@/components/BlogPost";

import { fetchBlog } from "@/lib/getBlog";

export default async function Blog({
  params,
}: {
  params: { id: string }
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["blog", params.id],
    queryFn: () => fetchBlog(Number(params.id)),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogPost id={Number(params.id)} />
    </HydrationBoundary>
  );
}
