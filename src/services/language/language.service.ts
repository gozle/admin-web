import { baseQueryWithReauth } from "@/lib/modules";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  CreateLanguageRequest,
  CreateLanguageResponse,
  DeleteLanguageRequest,
  DeleteLanguageResponse,
  GetLanguageListRequest,
  GetLanguageListResponse,
  GetLanguageRequest,
  GetLanguageResponse,
  UpdateLanguageRequest,
  UpdateLanguageResponse,
} from "./language.type";

export const languageApi = createApi({
  reducerPath: "languageApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Languages"],
  endpoints: (builder) => ({
    getLanguageList: builder.query<
      GetLanguageListResponse,
      GetLanguageListRequest
    >({
      query: () => "language/list",
      providesTags: (res: GetLanguageListResponse | undefined) =>
        res
          ? [
              ...res.data.map(({ id }) => ({ type: "Languages" as const, id })),
              { type: "Languages", id: "LIST" },
            ]
          : [{ type: "Languages", id: "LIST" }],
    }),
    getLanguage: builder.query<GetLanguageResponse, GetLanguageRequest>({
      query: (id) => ({ url: `language/${id}`, method: "GET" }),
      providesTags: (res) => (res ? [{ type: "Languages", id: res.id }] : []),
    }),
    createLanguage: builder.mutation<
      CreateLanguageResponse,
      CreateLanguageRequest
    >({
      query: (body) => ({ url: "language", method: "POST", body }),
      invalidatesTags: [{ type: "Languages", id: "LIST" }],
    }),
    updateLanguage: builder.mutation<
      UpdateLanguageResponse,
      UpdateLanguageRequest
    >({
      query: ({ id, body }) => ({ url: `language/${id}`, method: "PUT", body }),
      invalidatesTags: (res, _, req) =>
        res ? [{ type: "Languages", id: req.id }] : [],
    }),
    deleteLanguage: builder.mutation<
      DeleteLanguageResponse,
      DeleteLanguageRequest
    >({
      query: (id) => ({ url: `language/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Languages", id: "LIST" }],
    }),
  }),
});

export const {
  useGetLanguageListQuery,
  useGetLanguageQuery,
  useCreateLanguageMutation,
  useUpdateLanguageMutation,
  useDeleteLanguageMutation,
} = languageApi;
