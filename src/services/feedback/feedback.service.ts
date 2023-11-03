import { baseQueryWithReauth } from "@/lib/modules";
import { objectToQueryStringSerializer } from "@/lib/serializers";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  CheckFeedbackRequest,
  CheckFeedbackResponse,
  DeleteFeedbackRequest,
  DeleteFeedbackResponse,
  GetFeedbackListRequest,
  GetFeedbackListResponse,
  GetFeedbackRequest,
  GetFeedbackResponse,
  RecoverFeedbackRequest,
  RecoverFeedbackResponse,
} from "./feedback.type";

export const feedbackApi = createApi({
  reducerPath: "feedbackApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Feedbacks"],
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getFeedbackList: builder.query<
      GetFeedbackListResponse,
      GetFeedbackListRequest
    >({
      query: (query) => `feedback/list?${objectToQueryStringSerializer(query)}`,
      providesTags: (res: GetFeedbackListResponse | undefined) =>
        res
          ? [
              ...res.data.map(({ id }) => ({ type: "Feedbacks" as const, id })),
              { type: "Feedbacks", id: "LIST" },
            ]
          : [{ type: "Feedbacks", id: "LIST" }],
    }),
    getFeedback: builder.query<GetFeedbackResponse, GetFeedbackRequest>({
      query: (id) => ({ url: `feedback/${id}`, method: "GET" }),
      providesTags: (res) => (res ? [{ type: "Feedbacks", id: res.id }] : []),
    }),
    checkFeedback: builder.mutation<
      CheckFeedbackResponse,
      CheckFeedbackRequest
    >({
      query: (id) => ({ url: `feedback/check/${id}`, method: "GET" }),
      invalidatesTags: [{ type: "Feedbacks", id: "LIST" }],
    }),
    deleteFeedback: builder.mutation<
      DeleteFeedbackResponse,
      DeleteFeedbackRequest
    >({
      query: ({ id, permanently }) => ({
        url: `feedback/${id}`,
        method: "DELETE",
        params: { permanently },
      }),
      invalidatesTags: [{ type: "Feedbacks", id: "LIST" }],
    }),
    recoverFeedback: builder.mutation<
      RecoverFeedbackResponse,
      RecoverFeedbackRequest
    >({
      query: (id) => `feedback/recover/${id}`,
      invalidatesTags: [{ type: "Feedbacks", id: "LIST" }],
    }),
  }),
});

export const {
  useGetFeedbackListQuery,
  useGetFeedbackQuery,
  useDeleteFeedbackMutation,
  useCheckFeedbackMutation,
  useRecoverFeedbackMutation,
} = feedbackApi;
