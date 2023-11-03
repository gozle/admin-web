import React from "react";
import {
  SiteTranslation,
  UpdateSiteTranslationRequest,
  useUpdateSiteTranslationMutation,
} from "@/services/site";
import { SiteTranslationForm } from "./site-translation-form.component";

interface P {
  initialData: SiteTranslation;
  onAfterSubmit?: (result: SiteTranslation) => void;
  onCancel?: () => void;
}

export const EditSiteTranslationForm = ({
  initialData,
  onAfterSubmit,
  onCancel,
}: P) => {
  const [updateSiteTranslation, { error, isLoading, reset }] =
    useUpdateSiteTranslationMutation();

  const handleSubmit = async (body: UpdateSiteTranslationRequest["body"]) => {
    const res = await updateSiteTranslation({
      id: initialData.id,
      siteId: initialData.siteId,
      body,
    }).unwrap();
    onAfterSubmit?.(res);
  };

  return (
    <SiteTranslationForm
      edit={true}
      initialData={initialData}
      error={error}
      isLoading={isLoading}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      reset={reset}
      title="Edit site translation"
    />
  );
};
