import { PayloadAction } from "@reduxjs/toolkit";

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export type AuthState = { isAuth: true; tokens: Tokens } | { isAuth: false };

export type AuthReducers = {
  setTokens: (state: AuthState, action: PayloadAction<Tokens>) => AuthState;
  loggedOut: () => AuthState;
};
