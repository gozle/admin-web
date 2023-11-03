import {
  BlogPostTranslation,
  CreateBlogPostTranslationRequest,
  useCreateBlogPostTranslationMutation,
} from "@/services/blog";
import React from "react";
import { BlogPostTranslationForm } from "./blog-post-translation-form.component";

interface P {
  blogPostId: number;
  onAfterSubmit?: (result: BlogPostTranslation) => void;
  onCancel?: () => void;
}

export const AddBlogPostTranslationForm = ({
  blogPostId,
  onAfterSubmit,
  onCancel,
}: P) => {
  const [createBlogPost, { error, isLoading, reset }] =
    useCreateBlogPostTranslationMutation();

  const handleSubmit = async (data: CreateBlogPostTranslationRequest) => {
    const res = await createBlogPost(data).unwrap();
    onAfterSubmit?.(res);
  };

  return (
    <BlogPostTranslationForm
      blogPostId={blogPostId}
      edit={false}
      error={error}
      isLoading={isLoading}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      reset={reset}
      title="Add BP translation"
    />
  );
};
