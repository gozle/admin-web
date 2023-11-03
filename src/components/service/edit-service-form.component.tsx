import React from "react";
import { Service, useUpdateServiceMutation } from "@/services/service";
import { ServiceForm } from "./service-form.component";

interface P {
  initialData: Service;
  onAfterSubmit?: (result: Service) => void;
  onCancel?: () => void;
}

export const EditServiceForm = ({
  initialData,
  onAfterSubmit,
  onCancel,
}: P) => {
  const [updateService, { error, isLoading, reset }] =
    useUpdateServiceMutation();

  const handleSubmit = async (body: FormData) => {
    const res = await updateService({
      id: initialData.id,
      body,
    }).unwrap();
    onAfterSubmit?.(res);
  };

  return (
    <ServiceForm
      edit={true}
      initialData={initialData}
      error={error}
      isLoading={isLoading}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      reset={reset}
      title="Edit service"
    />
  );
};
