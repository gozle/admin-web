import { createSlice } from "@reduxjs/toolkit";
import { AuthReducers, AuthState } from "./auth.type";

const accessToken = localStorage.getItem("access-token");
const refreshToken = localStorage.getItem("refresh-token");
const initialState: AuthState =
  accessToken && refreshToken
    ? { isAuth: true, tokens: { accessToken, refreshToken } }
    : { isAuth: false };

export const authSlice = createSlice<AuthState, AuthReducers>({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (_, action) => {
      localStorage.setItem("access-token", action.payload.accessToken);
      localStorage.setItem("refresh-token", action.payload.refreshToken);
      return { isAuth: true, tokens: action.payload };
    },
    loggedOut: () => ({ isAuth: false }),
  },
});

export const { setTokens, loggedOut } = authSlice.actions;

export const authReducer = authSlice.reducer;
