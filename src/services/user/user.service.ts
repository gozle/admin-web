import { baseQueryWithReauth } from "@/lib/modules";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  CreateUserRequest,
  CreateUserResponse,
  GetUserListResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from "./user.type";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUserList: builder.query<GetUserListResponse, void>({
      query: () => "user/list",
      providesTags: (res: GetUserListResponse | undefined) =>
        res
          ? [
              ...res.data.map(({ id }) => ({ type: "Users" as const, id })),
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
    }),
    createUser: builder.mutation<CreateUserResponse, CreateUserRequest>({
      query: (body) => ({ url: "user", method: "POST", body }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    updateUser: builder.mutation<UpdateUserResponse, UpdateUserRequest>({
      query: ({ id, body }) => ({ url: `user/${id}`, method: "PUT", body }),
      invalidatesTags: (_, __, req) => [{ type: "Users", id: req.id }],
    }),
  }),
});

export const {
  useGetUserListQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} = userApi;
