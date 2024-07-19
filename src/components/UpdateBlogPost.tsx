"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { fetchBlog } from "@/lib/getBlog";
import { BlogPost } from "@/lib/tsUtils";
import UpdateBlogPost from "@/lib/updateBlogPost";

export default function UpdateBlog({ id }: { id: number }) {
  const queryClient = useQueryClient();
  // fetching the data based on the id for prepopulating
  const { data, error, isLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlog(Number(id)),
    refetchOnWindowFocus: true,
  });
  // invalidating the query so that the data will be up to date
  const mutation = useMutation({
    mutationFn: UpdateBlogPost,
    onMutate: (values) => {
      queryClient.cancelQueries({ queryKey: ["blog"] });
      const oldPosts = queryClient.getQueryData(["blog"]);
      queryClient.setQueryData(["blog"], (old: any) => {
        return [
          ...old,
          {
            ...values,
            id: Date.now(),
            isPreview: true,
          },
        ];
      });
      return () => queryClient.setQueryData(["blog"], oldPosts);
    },
    onError: (error, values) => {
      console.log("here", error);
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
  });
   // destructuring the necessary things from useform and set the default values
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BlogPost>({
    defaultValues: {
      title: "",
      body: "",
      id: 0,
    },
  });
  // setting the values 
  useEffect(() => {
    if (data) {
      setValue("title", data.title);
      setValue("body", data.body);
      setValue("id", data.id);
    }
  }, [data, setValue]);
  // submitting and resettign the form
  const submitForm: SubmitHandler<BlogPost> = (data) => {
    mutation.mutate(data);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>Some thing went wrong while populating the data...</div>;

  return (
    <div>
      <article className="p-4">
        <h1 className="text-3xl font-bold mb-4">{data?.title}</h1>
      </article>
      <div>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">
              Title:
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              id="title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>
          <div className="mt-4">
            <label htmlFor="body" className="block text-gray-700">
              Body:
            </label>
            <textarea
              rows={5}
              {...register("body", { required: "Body is required" })}
              id="body"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.body && (
              <p className="text-red-500">{errors.body.message}</p>
            )}
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
