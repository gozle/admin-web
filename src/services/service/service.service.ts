import { baseQueryWithReauth } from "../base-query";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  GetServiceTranslationListResponse,
  GetServiceTranslationListRequest,
  GetServiceTranslationResponse,
  GetServiceTranslationRequest,
  CreateServiceTranslationResponse,
  CreateServiceTranslationRequest,
  UpdateServiceTranslationResponse,
  UpdateServiceTranslationRequest,
  DeleteServiceTranslationResponse,
  DeleteServiceTranslationRequest,
  RecoverServiceTranslationResponse,
  RecoverServiceTranslationRequest,
} from "./service-translation.type";
import {
  CreateServiceRequest,
  CreateServiceResponse,
  DeleteServiceRequest,
  DeleteServiceResponse,
  GetServiceListRequest,
  GetServiceListResponse,
  GetServiceRequest,
  GetServiceResponse,
  RecoverServiceRequest,
  RecoverServiceResponse,
  UpdateServiceRequest,
  UpdateServiceResponse,
} from "./service.type";

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Services", "ServiceTranslations"],
  endpoints: (builder) => ({
    getServiceList: builder.query<
      GetServiceListResponse,
      GetServiceListRequest
    >({
      query: () => `admin/service/list`,
      providesTags: (res: GetServiceListResponse | undefined) =>
        res
          ? [
              ...res.data.map(({ id }) => ({ type: "Services" as const, id })),
              { type: "Services", id: "LIST" },
            ]
          : [{ type: "Services", id: "LIST" }],
    }),
    getService: builder.query<GetServiceResponse, GetServiceRequest>({
      query: (id) => ({ url: `admin/service/${id}`, method: "GET" }),
      providesTags: (res) => (res ? [{ type: "Services", id: res.id }] : []),
    }),
    createService: builder.mutation<
      CreateServiceResponse,
      CreateServiceRequest
    >({
      query: (body) => ({ url: "admin/service", method: "POST", body }),
      invalidatesTags: [{ type: "Services", id: "LIST" }],
    }),
    updateService: builder.mutation<
      UpdateServiceResponse,
      UpdateServiceRequest
    >({
      query: ({ id, body }) => ({
        url: `admin/service/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (res, _, req) =>
        res
          ? [
              { type: "Services", id: req.id },
              { type: "Services", id: "LIST" },
            ]
          : [],
    }),
    deleteService: builder.mutation<
      DeleteServiceResponse,
      DeleteServiceRequest
    >({
      query: ({ id, permanently }) => ({
        url: `admin/service/${id}`,
        method: "DELETE",
        params: { permanently },
      }),
      invalidatesTags: [{ type: "Services", id: "LIST" }],
    }),
    recoverService: builder.mutation<
      RecoverServiceResponse,
      RecoverServiceRequest
    >({
      query: (id) => `admin/service/recover/${id}`,
      invalidatesTags: [{ type: "Services", id: "LIST" }],
    }),

    getServiceTranslationList: builder.query<
      GetServiceTranslationListResponse,
      GetServiceTranslationListRequest
    >({
      query: () => "admin/service-translation/list",
      providesTags: (res: GetServiceTranslationListResponse | undefined) =>
        res
          ? [
              ...res.data.map(({ id }) => ({
                type: "ServiceTranslations" as const,
                id,
              })),
              { type: "ServiceTranslations", id: "LIST" },
            ]
          : [{ type: "ServiceTranslations", id: "LIST" }],
    }),
    getServiceTranslation: builder.query<
      GetServiceTranslationResponse,
      GetServiceTranslationRequest
    >({
      query: (id) => ({
        url: `admin/service-translation/${id}`,
        method: "GET",
      }),
      providesTags: (res) =>
        res ? [{ type: "ServiceTranslations", id: res.id }] : [],
    }),
    createServiceTranslation: builder.mutation<
      CreateServiceTranslationResponse,
      CreateServiceTranslationRequest
    >({
      query: (body) => ({
        url: "admin/service-translation",
        method: "POST",
        body,
      }),
      invalidatesTags: (res, _, req) => [
        { type: "ServiceTranslations", id: "LIST" },
        { type: "Services", id: req.serviceId },
        { type: "Services", id: "LIST" },
      ],
    }),
    updateServiceTranslation: builder.mutation<
      UpdateServiceTranslationResponse,
      UpdateServiceTranslationRequest
    >({
      query: ({ id, body }) => ({
        url: `admin/service-translation/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_, __, req) => [
        { type: "ServiceTranslations", id: req.id },
        { type: "Services", id: req.serviceId },
        { type: "ServiceTranslations", id: "LIST" },
        { type: "Services", id: "LIST" },
      ],
    }),
    deleteServiceTranslation: builder.mutation<
      DeleteServiceTranslationResponse,
      DeleteServiceTranslationRequest
    >({
      query: ({ id, permanently }) => ({
        url: `admin/service-translation/${id}`,
        method: "DELETE",
        params: { permanently },
      }),
      invalidatesTags: (_, __, req) => [
        { type: "ServiceTranslations", id: "LIST" },
        { type: "Services", id: req.serviceId },
        { type: "Services", id: "LIST" },
      ],
    }),
    recoverServiceTranslation: builder.mutation<
      RecoverServiceTranslationResponse,
      RecoverServiceTranslationRequest
    >({
      query: ({ id }) => `admin/service-translation/recover/${id}`,
      invalidatesTags: (_, __, req) => [
        { type: "ServiceTranslations", id: "LIST" },
        { type: "Services", id: req.serviceId },
        { type: "Services", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetServiceListQuery,
  useGetServiceQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useRecoverServiceMutation,

  useGetServiceTranslationListQuery,
  useGetServiceTranslationQuery,
  useCreateServiceTranslationMutation,
  useUpdateServiceTranslationMutation,
  useDeleteServiceTranslationMutation,
  useRecoverServiceTranslationMutation,
} = serviceApi;
