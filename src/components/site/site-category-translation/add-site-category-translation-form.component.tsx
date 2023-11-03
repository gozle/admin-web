import {
  CreateSiteCategoryTranslationRequest,
  useCreateSiteCategoryTranslationMutation,
  SiteCategoryTranslation,
} from "@/services/site";
import React from "react";
import { SiteCategoryTranslationForm } from "./site-category-translation-form.component";

interface P {
  siteCategoryId: number;
  onAfterSubmit?: (result: SiteCategoryTranslation) => void;
  onCancel?: () => void;
}

export const AddSiteCategoryTranslationForm = ({
  siteCategoryId,
  onAfterSubmit,
  onCancel,
}: P) => {
  const [createSiteCategoryTranslation, { error, isLoading, reset }] =
    useCreateSiteCategoryTranslationMutation();

  const handleSubmit = async (data: CreateSiteCategoryTranslationRequest) => {
    const res = await createSiteCategoryTranslation(data).unwrap();
    onAfterSubmit?.(res);
  };

  return (
    <SiteCategoryTranslationForm
      edit={false}
      error={error}
      isLoading={isLoading}
      siteCategoryId={siteCategoryId}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      reset={reset}
      title="Add site category translation"
    />
  );
};
