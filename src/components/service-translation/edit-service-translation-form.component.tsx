import React from "react";
import {
  ServiceTranslation,
  UpdateServiceTranslationRequest,
  useUpdateServiceTranslationMutation,
} from "@/services/service";
import { ServiceTranslationForm } from "./service-translation-form.component";

interface P {
  initialData: ServiceTranslation;
  onAfterSubmit?: (result: ServiceTranslation) => void;
  onCancel?: () => void;
}

export const EditServiceTranslationForm = ({
  initialData,
  onAfterSubmit,
  onCancel,
}: P) => {
  const [updateServiceTranslation, { error, isLoading, reset }] =
    useUpdateServiceTranslationMutation();

  const handleSubmit = async (
    body: UpdateServiceTranslationRequest["body"]
  ) => {
    const res = await updateServiceTranslation({
      id: initialData.id,
      serviceId: initialData.serviceId,
      body,
    }).unwrap();
    onAfterSubmit?.(res);
  };

  return (
    <ServiceTranslationForm
      edit={true}
      initialData={initialData}
      error={error}
      isLoading={isLoading}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      reset={reset}
      title="Edit service translation"
    />
  );
};
