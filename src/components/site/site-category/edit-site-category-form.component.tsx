import React from "react";
import {
  SiteCategory,
  UpdateSiteCategoryRequest,
  useUpdateSiteCategoryMutation,
} from "@/services/site";
import { SiteCategoryForm } from "./site-category-form.component";

interface P {
  initialData: SiteCategory;
  onAfterSubmit?: (result: SiteCategory) => void;
  onCancel?: () => void;
}

export const EditSiteCategoryForm = ({
  initialData,
  onAfterSubmit,
  onCancel,
}: P) => {
  const [updateSiteCategory, { error, isLoading, reset }] =
    useUpdateSiteCategoryMutation();

  const handleSubmit = async (body: UpdateSiteCategoryRequest["body"]) => {
    const res = await updateSiteCategory({
      id: initialData.id,
      body,
    }).unwrap();
    onAfterSubmit?.(res);
  };

  return (
    <SiteCategoryForm
      initialData={initialData}
      error={error}
      isLoading={isLoading}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      reset={reset}
      title="Edit site category"
    />
  );
};
