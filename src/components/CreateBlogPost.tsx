"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { BlogPost } from "@/lib/tsUtils";
import CreateBlogPost from "@/lib/createBlogPost";


export default function CreateBlog() {
  const queryClient = useQueryClient();
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BlogPost>();
  const submitForm: SubmitHandler<BlogPost> = (data) => {
    mutation.mutate(data);
    reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <input
          type="text"
          {...register("title", { required: true })}
          id="title"
        />
        {errors.title && <p>This field is required</p>}
        <br />
        <br />
        <textarea
          rows={5}
          {...register("body", {
            required: true,
          })}
        />
        {errors.body && <p>This field is required</p>}
        <br />
        <br />
        <input
          type="submit"
          value={
            mutation.isPending
              ? "Saving..."
              : mutation.isError
              ? "Error!"
              : mutation.isSuccess
              ? "Saved!"
              : "Create Post"
          }
        />
      </form>
    </div>
  );
}
