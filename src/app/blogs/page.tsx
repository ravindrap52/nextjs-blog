import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import BlogPosts from "@/components/BlogPosts";

import { getBlogs } from "@/lib/getBlogs";

export default async function Blogs() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["blog"],
    queryFn: getBlogs,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogPosts />
    </HydrationBoundary>
  );
}
