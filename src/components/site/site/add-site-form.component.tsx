import React from "react";
import { Site, useCreateSiteMutation } from "@/services/site";
import { SiteForm } from "./site-form.component";

interface P {
  categoryId?: number;
  onAfterSubmit?: (result: Site) => void;
  onCancel?: () => void;
}

export const AddSiteForm = ({ categoryId, onAfterSubmit, onCancel }: P) => {
  const [createSite, { error, isLoading, reset }] = useCreateSiteMutation();

  const handleSubmit = async (data: FormData) => {
    const res = await createSite(data).unwrap();
    onAfterSubmit?.(res);
  };

  return (
    <SiteForm
      edit={false}
      categoryId={categoryId}
      error={error}
      isLoading={isLoading}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      reset={reset}
      title="Add site"
    />
  );
};
