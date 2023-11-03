import React from "react";
import { Service, useCreateServiceMutation } from "@/services/service";
import { ServiceForm } from "./service-form.component";

interface P {
  onAfterSubmit?: (result: Service) => void;
  onCancel?: () => void;
}

export const AddServiceForm = ({ onAfterSubmit, onCancel }: P) => {
  const [createService, { error, isLoading, reset }] =
    useCreateServiceMutation();

  const handleSubmit = async (data: FormData) => {
    const res = await createService(data).unwrap();
    onAfterSubmit?.(res);
  };

  return (
    <ServiceForm
      edit={false}
      error={error}
      isLoading={isLoading}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      reset={reset}
      title="Add service"
    />
  );
};
