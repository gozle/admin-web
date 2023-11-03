import { OptionalNullable } from "@/lib/type";
import { Language } from "../language";
import { Service } from "./service.type";

export type ServiceTranslation = {
  id: number;
  title: string;
  description: string;
  languageId: number;
  language?: Language;
  serviceId: number;
  service?: Service;
  siteUrl: string | null;
  deletedAt: string | null;
};

export type GetServiceTranslationListFilter = {
  languageId?: number;
  serviceId?: number;
};

export type GetServiceTranslationListRequest = {
  filters: GetServiceTranslationListFilter;
};
export type GetServiceTranslationListResponse = {
  data: ServiceTranslation[];
};

export type GetServiceTranslationRequest = number;
export type GetServiceTranslationResponse = ServiceTranslation;

export type CreateServiceTranslationResponse = ServiceTranslation;
export type CreateServiceTranslationRequest = OptionalNullable<
  Omit<ServiceTranslation, "id" | "service" | "language" | "deletedAt">
>;

export type UpdateServiceTranslationResponse = ServiceTranslation;
export type UpdateServiceTranslationRequest = {
  id: number;
  serviceId: number;
  body: Partial<Omit<CreateServiceTranslationRequest, "serviceId">>;
};

export type DeleteServiceTranslationResponse = boolean;
export type DeleteServiceTranslationRequest = {
  id: number;
  serviceId: number;
  permanently?: boolean;
};

export type RecoverServiceTranslationResponse = boolean;
export type RecoverServiceTranslationRequest = {
  id: number;
  serviceId: number;
};
