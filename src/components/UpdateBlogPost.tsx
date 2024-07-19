"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { fetchBlog } from "@/lib/getBlog";
import { BlogPost } from "@/lib/tsUtils";
import UpdateBlogPost from "@/lib/updateBlogPost";

export default function UpdateBlog({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlog(Number(id)),
    refetchOnWindowFocus: true,
  });

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
  useEffect(() => {
    if (data) {
      setValue("title", data.title);
      setValue("body", data.body);
      setValue("id", data.id);
    }
  }, [data, setValue]);

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
          <div>
            <label htmlFor="title" className="block font-semibold">
              Title:
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              id="title"
              className="border p-2 w-full"
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>
          <div className="mt-4">
            <label htmlFor="body" className="block font-semibold">
              Body:
            </label>
            <textarea
              rows={5}
              {...register("body", { required: "Body is required" })}
              id="body"
              className="border p-2 w-full"
            />
            {errors.body && (
              <p className="text-red-500">{errors.body.message}</p>
            )}
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
