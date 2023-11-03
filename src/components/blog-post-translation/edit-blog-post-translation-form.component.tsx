import {
  BlogPostTranslation,
  UpdateBlogPostTranslationRequest,
  useUpdateBlogPostTranslationMutation,
} from "@/services/blog";
import React from "react";
import { BlogPostTranslationForm } from "./blog-post-translation-form.component";

interface P {
  initialData: BlogPostTranslation;
  onAfterSubmit?: (result: BlogPostTranslation) => void;
  onCancel?: () => void;
}

export const EditBlogPostTranslationForm = ({
  initialData,
  onAfterSubmit,
  onCancel,
}: P) => {
  const [updateBlogPost, { error, isLoading, reset }] =
    useUpdateBlogPostTranslationMutation();

  const handleSubmit = async (
    body: UpdateBlogPostTranslationRequest["body"]
  ) => {
    const res = await updateBlogPost({
      id: initialData.id,
      blogPostId: initialData.blogPostId,
      body,
    }).unwrap();
    onAfterSubmit?.(res);
  };

  return (
    <BlogPostTranslationForm
      edit={true}
      initialData={initialData}
      error={error}
      isLoading={isLoading}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      reset={reset}
      title="Edit BP translation"
    />
  );
};
