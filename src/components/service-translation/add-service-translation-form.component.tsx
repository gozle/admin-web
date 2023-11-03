import React from "react";
import { ServiceTranslationForm } from "./service-translation-form.component";
import {
  CreateServiceTranslationRequest,
  ServiceTranslation,
  useCreateServiceTranslationMutation,
} from "@/services/service";

interface P {
  serviceId: number;
  onAfterSubmit?: (result: ServiceTranslation) => void;
  onCancel?: () => void;
}

export const AddServiceTranslationForm = ({
  serviceId,
  onAfterSubmit,
  onCancel,
}: P) => {
  const [createServiceTranslation, { error, isLoading, reset }] =
    useCreateServiceTranslationMutation();

  const handleSubmit = async (data: CreateServiceTranslationRequest) => {
    const res = await createServiceTranslation(data).unwrap();
    onAfterSubmit?.(res);
  };

  return (
    <ServiceTranslationForm
      edit={false}
      error={error}
      isLoading={isLoading}
      serviceId={serviceId}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      reset={reset}
      title="Add service translation"
    />
  );
};
