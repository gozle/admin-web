import { baseQueryWithReauth } from "@/lib/modules";
import { objectToQueryStringSerializer } from "@/lib/serializers";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  GetSiteTranslationListResponse,
  GetSiteTranslationListRequest,
  GetSiteTranslationResponse,
  GetSiteTranslationRequest,
  CreateSiteTranslationResponse,
  CreateSiteTranslationRequest,
  UpdateSiteTranslationResponse,
  UpdateSiteTranslationRequest,
  DeleteSiteTranslationResponse,
  DeleteSiteTranslationRequest,
  RecoverSiteTranslationRequest,
  RecoverSiteTranslationResponse,
} from "./site-translation.type";
import {
  CreateSiteRequest,
  CreateSiteResponse,
  DeleteSiteRequest,
  DeleteSiteResponse,
  GetSiteListRequest,
  GetSiteListResponse,
  GetSiteRequest,
  GetSiteResponse,
  RecoverSiteRequest,
  RecoverSiteResponse,
  UpdateSiteRequest,
  UpdateSiteResponse,
} from "./site.type";
import {
  CreateSiteCategoryRequest,
  CreateSiteCategoryResponse,
  DeleteSiteCategoryRequest,
  DeleteSiteCategoryResponse,
  GetSiteCategoryListRequest,
  GetSiteCategoryListResponse,
  GetSiteCategoryRequest,
  GetSiteCategoryResponse,
  RecoverSiteCategoryRequest,
  RecoverSiteCategoryResponse,
  UpdateSiteCategoryRequest,
  UpdateSiteCategoryResponse,
} from "./site-category.type";
import {
  CreateSiteCategoryTranslationRequest,
  CreateSiteCategoryTranslationResponse,
  DeleteSiteCategoryTranslationRequest,
  DeleteSiteCategoryTranslationResponse,
  GetSiteCategoryTranslationListRequest,
  GetSiteCategoryTranslationListResponse,
  GetSiteCategoryTranslationRequest,
  GetSiteCategoryTranslationResponse,
  RecoverSiteCategoryTranslationRequest,
  RecoverSiteCategoryTranslationResponse,
  UpdateSiteCategoryTranslationRequest,
  UpdateSiteCategoryTranslationResponse,
} from "./site-category-translation.type";

export const siteApi = createApi({
  reducerPath: "siteApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Sites",
    "SiteTranslations",
    "SiteCategories",
    "SiteCategoryTranslations",
  ],
  endpoints: (builder) => ({
    getSiteList: builder.query<GetSiteListResponse, GetSiteListRequest>({
      query: (params) =>
        `admin/site/list?${
          params ? objectToQueryStringSerializer(params) : ""
        }`,
      providesTags: (res: GetSiteListResponse | undefined) =>
        res
          ? [
              ...res.data.map(({ id }) => ({
                type: "Sites" as const,
                id,
              })),
              { type: "Sites", id: "LIST" },
            ]
          : [{ type: "Sites", id: "LIST" }],
    }),
    getSite: builder.query<GetSiteResponse, GetSiteRequest>({
      query: (id) => ({ url: `admin/site/${id}`, method: "GET" }),
      providesTags: (res) => (res ? [{ type: "Sites", id: res.id }] : []),
    }),
    createSite: builder.mutation<CreateSiteResponse, CreateSiteRequest>({
      query: (body) => ({ url: "admin/site", method: "POST", body }),
      invalidatesTags: [{ type: "Sites", id: "LIST" }],
    }),
    updateSite: builder.mutation<UpdateSiteResponse, UpdateSiteRequest>({
      query: ({ id, body }) => ({
        url: `admin/site/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (res, _, req) =>
        res
          ? [
              { type: "Sites", id: req.id },
              { type: "Sites", id: "LIST" },
            ]
          : [],
    }),
    deleteSite: builder.mutation<DeleteSiteResponse, DeleteSiteRequest>({
      query: ({ id, permanently }) => ({
        url: `admin/site/${id}`,
        method: "DELETE",
        params: { permanently },
      }),
      invalidatesTags: [{ type: "Sites", id: "LIST" }],
    }),
    recoverSite: builder.mutation<RecoverSiteResponse, RecoverSiteRequest>({
      query: (id) => `admin/site/recover/${id}`,
      invalidatesTags: [{ type: "Sites", id: "LIST" }],
    }),
    getSiteTranslationList: builder.query<
      GetSiteTranslationListResponse,
      GetSiteTranslationListRequest
    >({
      query: () => "admin/site-translation/list",
      providesTags: (res: GetSiteTranslationListResponse | undefined) =>
        res
          ? [
              ...res.data.map(({ id }) => ({
                type: "SiteTranslations" as const,
                id,
              })),
              { type: "SiteTranslations", id: "LIST" },
            ]
          : [{ type: "SiteTranslations", id: "LIST" }],
    }),
    getSiteTranslation: builder.query<
      GetSiteTranslationResponse,
      GetSiteTranslationRequest
    >({
      query: (id) => ({ url: `admin/site-translation/${id}`, method: "GET" }),
      providesTags: (res) =>
        res ? [{ type: "SiteTranslations", id: res.id }] : [],
    }),
    createSiteTranslation: builder.mutation<
      CreateSiteTranslationResponse,
      CreateSiteTranslationRequest
    >({
      query: (body) => ({
        url: "admin/site-translation",
        method: "POST",
        body,
      }),
      invalidatesTags: (_, __, req) => [
        { type: "SiteTranslations", id: "LIST" },
        { type: "Sites", id: req.siteId },
        { type: "Sites", id: "LIST" },
      ],
    }),
    updateSiteTranslation: builder.mutation<
      UpdateSiteTranslationResponse,
      UpdateSiteTranslationRequest
    >({
      query: ({ id, body }) => ({
        url: `admin/site-translation/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_, __, req) => [
        { type: "SiteTranslations", id: req.id },
        { type: "Sites", id: req.siteId },
        { type: "SiteTranslations", id: "LIST" },
        { type: "Sites", id: "LIST" },
      ],
    }),
    deleteSiteTranslation: builder.mutation<
      DeleteSiteTranslationResponse,
      DeleteSiteTranslationRequest
    >({
      query: ({ id, permanently }) => ({
        url: `admin/site-translation/${id}`,
        method: "DELETE",
        params: { permanently },
      }),
      invalidatesTags: (_, __, req) => [
        { type: "SiteTranslations", id: "LIST" },
        { type: "Sites", id: req.siteId },
        { type: "Sites", id: "LIST" },
      ],
    }),
    recoverSiteTranslation: builder.mutation<
      RecoverSiteTranslationResponse,
      RecoverSiteTranslationRequest
    >({
      query: ({ id }) => `admin/site-translation/recover/${id}`,
      invalidatesTags: (_, __, req) => [
        { type: "SiteTranslations", id: "LIST" },
        { type: "Sites", id: req.siteId },
        { type: "Sites", id: "LIST" },
      ],
    }),
    getSiteCategoryList: builder.query<
      GetSiteCategoryListResponse,
      GetSiteCategoryListRequest
    >({
      query: () => "admin/site-category/list",
      providesTags: (res: GetSiteCategoryListResponse | undefined) =>
        res
          ? [
              ...res.data.map(({ id }) => ({
                type: "SiteCategories" as const,
                id,
              })),
              { type: "SiteCategories", id: "LIST" },
            ]
          : [{ type: "SiteCategories", id: "LIST" }],
    }),
    getSiteCategory: builder.query<
      GetSiteCategoryResponse,
      GetSiteCategoryRequest
    >({
      query: (id) => ({ url: `admin/site-category/${id}`, method: "GET" }),
      providesTags: (res) =>
        res ? [{ type: "SiteCategories", id: res.id }] : [],
    }),
    createSiteCategory: builder.mutation<
      CreateSiteCategoryResponse,
      CreateSiteCategoryRequest
    >({
      query: (body) => ({ url: "admin/site-category", method: "POST", body }),
      invalidatesTags: [{ type: "SiteCategories", id: "LIST" }],
    }),
    updateSiteCategory: builder.mutation<
      UpdateSiteCategoryResponse,
      UpdateSiteCategoryRequest
    >({
      query: ({ id, body }) => ({
        url: `admin/site-category/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (res, _, req) =>
        res
          ? [
              { type: "SiteCategories", id: req.id },
              { type: "SiteCategories", id: "LIST" },
            ]
          : [],
    }),
    deleteSiteCategory: builder.mutation<
      DeleteSiteCategoryResponse,
      DeleteSiteCategoryRequest
    >({
      query: ({ id, permanently }) => ({
        url: `admin/site-category/${id}`,
        method: "DELETE",
        params: { permanently },
      }),
      invalidatesTags: [{ type: "SiteCategories", id: "LIST" }],
    }),
    recoverSiteCategory: builder.mutation<
      RecoverSiteCategoryResponse,
      RecoverSiteCategoryRequest
    >({
      query: (id) => `admin/site-category/recover/${id}`,
      invalidatesTags: [{ type: "SiteCategories", id: "LIST" }],
    }),
    getSiteCategoryTranslationList: builder.query<
      GetSiteCategoryTranslationListResponse,
      GetSiteCategoryTranslationListRequest
    >({
      query: (params) =>
        `admin/site-category-translation/list?${
          params ? objectToQueryStringSerializer(params) : ""
        }`,
      providesTags: (res: GetSiteCategoryTranslationListResponse | undefined) =>
        res
          ? [
              ...res.data.map(({ id }) => ({
                type: "SiteCategoryTranslations" as const,
                id,
              })),
              { type: "SiteCategoryTranslations", id: "LIST" },
            ]
          : [{ type: "SiteCategoryTranslations", id: "LIST" }],
    }),
    getSiteCategoryTranslation: builder.query<
      GetSiteCategoryTranslationResponse,
      GetSiteCategoryTranslationRequest
    >({
      query: (id) => ({
        url: `admin/site-category-translation/${id}`,
        method: "GET",
      }),
      providesTags: (res) =>
        res ? [{ type: "SiteCategoryTranslations", id: res.id }] : [],
    }),
    createSiteCategoryTranslation: builder.mutation<
      CreateSiteCategoryTranslationResponse,
      CreateSiteCategoryTranslationRequest
    >({
      query: (body) => ({
        url: "admin/site-category-translation",
        method: "POST",
        body,
      }),
      invalidatesTags: (_, __, req) => [
        { type: "SiteCategoryTranslations", id: "LIST" },
        { type: "SiteCategories", id: req.siteCategoryId },
        { type: "SiteCategories", id: "LIST" },
      ],
    }),
    updateSiteCategoryTranslation: builder.mutation<
      UpdateSiteCategoryTranslationResponse,
      UpdateSiteCategoryTranslationRequest
    >({
      query: ({ id, body }) => ({
        url: `admin/site-category-translation/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_, __, req) => [
        { type: "SiteCategoryTranslations", id: req.id },
        { type: "SiteCategories", id: req.siteCategoryId },
        { type: "SiteCategoryTranslations", id: "LIST" },
        { type: "SiteCategories", id: "LIST" },
      ],
    }),
    deleteSiteCategoryTranslation: builder.mutation<
      DeleteSiteCategoryTranslationResponse,
      DeleteSiteCategoryTranslationRequest
    >({
      query: ({ id, permanently }) => ({
        url: `admin/site-category-translation/${id}`,
        method: "DELETE",
        params: { permanently },
      }),
      invalidatesTags: (_, __, req) => [
        { type: "SiteCategoryTranslations", id: "LIST" },
        { type: "SiteCategories", id: req.siteCategoryId },
        { type: "SiteCategories", id: "LIST" },
      ],
    }),
    recoverSiteCategoryTranslation: builder.mutation<
      RecoverSiteCategoryTranslationResponse,
      RecoverSiteCategoryTranslationRequest
    >({
      query: ({ id }) => `admin/site-category-translation/recover/${id}`,
      invalidatesTags: (_, __, req) => [
        { type: "SiteCategoryTranslations", id: "LIST" },
        { type: "SiteCategories", id: req.siteCategoryId },
        { type: "SiteCategories", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetSiteListQuery,
  useGetSiteQuery,
  useCreateSiteMutation,
  useUpdateSiteMutation,
  useDeleteSiteMutation,
  useRecoverSiteMutation,
  useGetSiteTranslationListQuery,
  useGetSiteTranslationQuery,
  useCreateSiteTranslationMutation,
  useUpdateSiteTranslationMutation,
  useDeleteSiteTranslationMutation,
  useRecoverSiteTranslationMutation,
  useGetSiteCategoryListQuery,
  useGetSiteCategoryQuery,
  useCreateSiteCategoryMutation,
  useUpdateSiteCategoryMutation,
  useDeleteSiteCategoryMutation,
  useRecoverSiteCategoryMutation,
  useGetSiteCategoryTranslationListQuery,
  useGetSiteCategoryTranslationQuery,
  useCreateSiteCategoryTranslationMutation,
  useUpdateSiteCategoryTranslationMutation,
  useDeleteSiteCategoryTranslationMutation,
  useRecoverSiteCategoryTranslationMutation,
} = siteApi;
