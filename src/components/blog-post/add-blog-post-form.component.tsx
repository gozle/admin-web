import {
  BlogPost,
  CreateBlogPostRequest,
  useCreateBlogPostMutation,
} from "@/services/blog";
import React from "react";
import { BlogPostForm } from "./blog-post-form.component";

interface P {
  onAfterSubmit?: (result: BlogPost) => void;
  onCancel?: () => void;
}

export const AddBlogPostForm = ({ onAfterSubmit, onCancel }: P) => {
  const [createBlogPost, { error, isLoading, reset }] =
    useCreateBlogPostMutation();

  const handleSubmit = async (data: CreateBlogPostRequest) => {
    const res = await createBlogPost(data).unwrap();
    onAfterSubmit?.(res);
  };

  return (
    <BlogPostForm
      edit={false}
      error={error}
      isLoading={isLoading}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      reset={reset}
      title="Add blog post"
    />
  );
};
