import { BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { AppDispatch, AppState } from "@/lib/store";
import { loggedOut, setTokens, Tokens } from "@/lib/store/features/auth";
import { Mutex } from "async-mutex";
import {
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query/fetchBaseQuery";

const mutex = new Mutex();

export const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const auth = (getState() as AppState).auth;
    if (auth.isAuth) {
      const token = auth.tokens.accessToken;
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQueryWithAuth(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const getState = api.getState as () => AppState;
        const dispatch = api.dispatch as AppDispatch;
        const authState = getState().auth;
        if (authState.isAuth) {
          const refreshResult = await baseQueryWithAuth(
            {
              url: "auth/refresh",
              method: "POST",
              body: { token: authState.tokens.refreshToken },
            },
            api,
            extraOptions
          );
          if (refreshResult.data) {
            // store the new token
            dispatch(setTokens(refreshResult.data as Tokens));
            // retry the initial query
            result = await baseQueryWithAuth(args, api, extraOptions);
          } else api.dispatch(loggedOut());
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQueryWithAuth(args, api, extraOptions);
    }
  }
  return result;
};
