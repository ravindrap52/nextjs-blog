"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { BlogPost } from "@/lib/tsUtils";
import CreateBlogPost from "@/lib/createBlogPost";

export default function CreateBlog() {
  const queryClient = useQueryClient();
  // invalidating the query so that the data will be up to date
  const mutation = useMutation({
    mutationFn: CreateBlogPost,
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
  // destructuring the necessary things from useform
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BlogPost>();
  // submitting and resettign the form
  const submitForm: SubmitHandler<BlogPost> = (data) => {
    mutation.mutate(data);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          {...register("title", { required: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && <p className="text-red-500">This field is required</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="body" className="block text-gray-700">
          Body
        </label>
        <textarea
          id="body"
          rows={5}
          {...register("body", { required: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.body && <p className="text-red-500">This field is required</p>}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {mutation.isPending
          ? "Saving..."
          : mutation.isError
          ? "Error!"
          : mutation.isSuccess
          ? "Saved!"
          : "Create Post"}
      </button>
    </form>
  );
}
