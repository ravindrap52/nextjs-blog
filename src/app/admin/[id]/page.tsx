import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
  } from "@tanstack/react-query";
  
  import UpdateBlog from "@/components/UpdateBlogPost";
  
  import { fetchBlog } from "@/lib/getBlog";
  
  export default async function UpdateBlogPost({
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
        <UpdateBlog id={Number(params.id)} />
      </HydrationBoundary>
    );
  }