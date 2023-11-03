import React from "react";
import { SiteCategory, useCreateSiteCategoryMutation } from "@/services/site";
import { SiteCategoryForm } from "./site-category-form.component";
import { CreateSiteCategoryRequest } from "@/services/site/site-category.type";

interface P {
  onAfterSubmit?: (result: SiteCategory) => void;
  onCancel?: () => void;
}

export const AddSiteCategoryForm = ({ onAfterSubmit, onCancel }: P) => {
  const [createSiteCategory, { error, isLoading, reset }] =
    useCreateSiteCategoryMutation();

  const handleSubmit = async (data: CreateSiteCategoryRequest) => {
    const res = await createSiteCategory(data).unwrap();
    onAfterSubmit?.(res);
  };

  return (
    <SiteCategoryForm
      error={error}
      isLoading={isLoading}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      reset={reset}
      title="Add site category"
    />
  );
};
