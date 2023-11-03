import {
  CreateSiteTranslationRequest,
  useCreateSiteTranslationMutation,
  SiteTranslation,
} from "@/services/site";
import React from "react";
import { SiteTranslationForm } from "./site-translation-form.component";

interface P {
  siteId: number;
  onAfterSubmit?: (result: SiteTranslation) => void;
  onCancel?: () => void;
}

export const AddSiteTranslationForm = ({
  siteId,
  onAfterSubmit,
  onCancel,
}: P) => {
  const [createSiteTranslation, { error, isLoading, reset }] =
    useCreateSiteTranslationMutation();

  const handleSubmit = async (data: CreateSiteTranslationRequest) => {
    const res = await createSiteTranslation(data).unwrap();
    onAfterSubmit?.(res);
  };

  return (
    <SiteTranslationForm
      edit={false}
      error={error}
      isLoading={isLoading}
      siteId={siteId}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      reset={reset}
      title="Add site translation"
    />
  );
};
