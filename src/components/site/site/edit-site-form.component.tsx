import React from "react";
import { Site, useUpdateSiteMutation } from "@/services/site";
import { SiteForm } from "./site-form.component";

interface P {
  initialData: Site;
  onAfterSubmit?: (result: Site) => void;
  onCancel?: () => void;
}

export const EditSiteForm = ({ initialData, onAfterSubmit, onCancel }: P) => {
  const [updateSite, { error, isLoading, reset }] = useUpdateSiteMutation();

  const handleSubmit = async (body: FormData) => {
    const res = await updateSite({
      id: initialData.id,
      body,
    }).unwrap();
    onAfterSubmit?.(res);
  };

  return (
    <SiteForm
      edit={true}
      initialData={initialData}
      error={error}
      isLoading={isLoading}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      reset={reset}
      title="Edit site"
    />
  );
};
