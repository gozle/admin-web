import { baseQueryWithReauth } from "@/lib/modules";
import { objectToQueryStringSerializer } from "@/lib/serializers";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  CreateBlogPostTranslationRequest,
  CreateBlogPostTranslationResponse,
  DeleteBlogPostTranslationRequest,
  DeleteBlogPostTranslationResponse,
  GetBlogPostTranslationListRequest,
  GetBlogPostTranslationListResponse,
  RecoverBlogPostTranslationRequest,
  RecoverBlogPostTranslationResponse,
  UpdateBlogPostTranslationRequest,
  UpdateBlogPostTranslationResponse,
} from "./blog-post-translation.type";
import {
  CreateBlogPostRequest,
  CreateBlogPostResponse,
  DeleteBlogPostRequest,
  DeleteBlogPostResponse,
  GetBlogPostListRequest,
  GetBlogPostListResponse,
  GetBlogPostRequest,
  GetBlogPostResponse,
  RecoverBlogPostRequest,
  RecoverBlogPostResponse,
  UpdateBlogPostRequest,
  UpdateBlogPostResponse,
} from "./blog-post.type";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["BlogPosts", "BlogPostTranslations"],
  endpoints: (builder) => ({
    getBlogPostList: builder.query<
      GetBlogPostListResponse,
      GetBlogPostListRequest
    >({
      query: (query) =>
        `admin/blog-post/list?${objectToQueryStringSerializer(query)}`,
      providesTags: (res: GetBlogPostListResponse | undefined) =>
        res
          ? [
              ...res.data.map(({ id }) => ({ type: "BlogPosts" as const, id })),
              { type: "BlogPosts", id: "LIST" },
            ]
          : [{ type: "BlogPosts", id: "LIST" }],
    }),
    getBlogPost: builder.query<GetBlogPostResponse, GetBlogPostRequest>({
      query: (id) => ({ url: `admin/blog-post/${id}`, method: "GET" }),
      providesTags: (res) => (res ? [{ type: "BlogPosts", id: res.id }] : []),
    }),
    createBlogPost: builder.mutation<
      CreateBlogPostResponse,
      CreateBlogPostRequest
    >({
      query: (body) => ({ url: "admin/blog-post", method: "POST", body }),
      invalidatesTags: [{ type: "BlogPosts", id: "LIST" }],
    }),
    updateBlogPost: builder.mutation<
      UpdateBlogPostResponse,
      UpdateBlogPostRequest
    >({
      query: ({ id, body }) => ({
        url: `admin/blog-post/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (res, _, req) =>
        res ? [{ type: "BlogPosts", id: req.id }] : [],
    }),
    deleteBlogPost: builder.mutation<
      DeleteBlogPostResponse,
      DeleteBlogPostRequest
    >({
      query: ({ id, permanently }) => ({
        url: `admin/blog-post/${id}`,
        method: "DELETE",
        params: { permanently },
      }),
      invalidatesTags: [{ type: "BlogPosts", id: "LIST" }],
    }),
    recoverBlogPost: builder.mutation<
      RecoverBlogPostResponse,
      RecoverBlogPostRequest
    >({
      query: (id) => `admin/blog-post/recover/${id}`,
      invalidatesTags: [{ type: "BlogPosts", id: "LIST" }],
    }),

    getBlogPostTranslationList: builder.query<
      GetBlogPostTranslationListResponse,
      GetBlogPostTranslationListRequest
    >({
      query: () => "admin/blog-post-translation/list",
      providesTags: (res: GetBlogPostTranslationListResponse | undefined) =>
        res
          ? [
              ...res.data.map(({ id }) => ({
                type: "BlogPostTranslations" as const,
                id,
              })),
              { type: "BlogPostTranslations", id: "LIST" },
            ]
          : [{ type: "BlogPostTranslations", id: "LIST" }],
    }),
    createBlogPostTranslation: builder.mutation<
      CreateBlogPostTranslationResponse,
      CreateBlogPostTranslationRequest
    >({
      query: (body) => ({
        url: "admin/blog-post-translation",
        method: "POST",
        body,
      }),
      invalidatesTags: (res, _, req) => [
        { type: "BlogPostTranslations", id: "LIST" },
        { type: "BlogPosts", id: req.blogPostId },
        { type: "BlogPosts", id: "LIST" },
      ],
    }),
    updateBlogPostTranslation: builder.mutation<
      UpdateBlogPostTranslationResponse,
      UpdateBlogPostTranslationRequest
    >({
      query: ({ id, body }) => ({
        url: `admin/blog-post-translation/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_, __, req) => [
        { type: "BlogPostTranslations", id: req.id },
        { type: "BlogPosts", id: req.blogPostId },
        { type: "BlogPostTranslations", id: "LIST" },
        { type: "BlogPosts", id: "LIST" },
      ],
    }),
    deleteBlogPostTranslation: builder.mutation<
      DeleteBlogPostTranslationResponse,
      DeleteBlogPostTranslationRequest
    >({
      query: ({ id, permanently }) => ({
        url: `admin/blog-post-translation/${id}`,
        method: "DELETE",
        params: { permanently },
      }),
      invalidatesTags: (_, __, req) => [
        { type: "BlogPostTranslations", id: "LIST" },
        { type: "BlogPosts", id: req.blogPostId },
        { type: "BlogPosts", id: "LIST" },
      ],
    }),
    recoverBlogPostTranslation: builder.mutation<
      RecoverBlogPostTranslationResponse,
      RecoverBlogPostTranslationRequest
    >({
      query: ({ id }) => `admin/blog-post-translation/recover/${id}`,
      invalidatesTags: (_, __, req) => [
        { type: "BlogPostTranslations", id: "LIST" },
        { type: "BlogPosts", id: req.blogPostId },
        { type: "BlogPosts", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetBlogPostListQuery,
  useGetBlogPostQuery,
  useCreateBlogPostMutation,
  useUpdateBlogPostMutation,
  useDeleteBlogPostMutation,
  useRecoverBlogPostMutation,

  useGetBlogPostTranslationListQuery,
  useCreateBlogPostTranslationMutation,
  useUpdateBlogPostTranslationMutation,
  useDeleteBlogPostTranslationMutation,
  useRecoverBlogPostTranslationMutation,
} = blogApi;
