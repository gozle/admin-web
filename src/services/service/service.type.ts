import { ServiceTranslation } from "./service-translation.type";

export type Service = {
  id: number;
  logo: string;
  siteUrl: string;
  color: string;
  translations?: ServiceTranslation[];
  deletedAt: string | null;
};

export type GetServiceListRequest = void;
export type GetServiceListResponse = { data: Service[] };

export type GetServiceRequest = number;
export type GetServiceResponse = Service;

export type CreateServiceResponse = Service;
export type CreateServiceDTO = Omit<
  Service,
  "id" | "translations" | "deletedAt"
>;
export type CreateServiceRequest = CreateServiceDTO | FormData;

export type UpdateServiceResponse = Service;
export type UpdateServiceRequest = {
  id: number;
  body: Partial<CreateServiceDTO> | FormData;
};

export type DeleteServiceResponse = boolean;
export type DeleteServiceRequest = { id: number; permanently?: boolean };

export type RecoverServiceResponse = boolean;
export type RecoverServiceRequest = number;
