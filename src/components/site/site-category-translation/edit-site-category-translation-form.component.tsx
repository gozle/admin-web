import React from "react";
import {
  SiteCategoryTranslation,
  UpdateSiteCategoryTranslationRequest,
  useUpdateSiteCategoryTranslationMutation,
} from "@/services/site";
import { SiteCategoryTranslationForm } from "./site-category-translation-form.component";

interface P {
  initialData: SiteCategoryTranslation;
  onAfterSubmit?: (result: SiteCategoryTranslation) => void;
  onCancel?: () => void;
}

export const EditSiteCategoryTranslationForm = ({
  initialData,
  onAfterSubmit,
  onCancel,
}: P) => {
  const [updateSiteCategoryTranslation, { error, isLoading, reset }] =
    useUpdateSiteCategoryTranslationMutation();

  const handleSubmit = async (
    body: UpdateSiteCategoryTranslationRequest["body"]
  ) => {
    const res = await updateSiteCategoryTranslation({
      id: initialData.id,
      siteCategoryId: initialData.siteCategoryId,
      body,
    }).unwrap();
    onAfterSubmit?.(res);
  };

  return (
    <SiteCategoryTranslationForm
      edit={true}
      initialData={initialData}
      error={error}
      isLoading={isLoading}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      reset={reset}
      title="Edit site category translation"
    />
  );
};
