import {
  BlogPost,
  CreateBlogPostRequest,
  useUpdateBlogPostMutation,
} from "@/services/blog";
import React from "react";
import { BlogPostForm } from "./blog-post-form.component";

interface P {
  initialData: BlogPost;
  onAfterSubmit?: (result: BlogPost) => void;
  onCancel?: () => void;
}

export const EditBlogPostForm = ({
  initialData,
  onAfterSubmit,
  onCancel,
}: P) => {
  const [updateBlogPost, { error, isLoading, reset }] =
    useUpdateBlogPostMutation();

  const handleSubmit = async (body: CreateBlogPostRequest) => {
    const res = await updateBlogPost({ id: initialData.id, body }).unwrap();
    onAfterSubmit?.(res);
  };

  return (
    <BlogPostForm
      edit={true}
      error={error}
      isLoading={isLoading}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      reset={reset}
      title="Edit blog post"
    />
  );
};
