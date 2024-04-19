import { baseQueryWithAuth } from "../base-query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { SignInRequest, SignInResponse } from "./auth.type";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInResponse, SignInRequest>({
      query: (body) => ({ url: "auth/sign-in", method: "POST", body }),
    }),
  }),
});

export const { useSignInMutation } = authApi;
