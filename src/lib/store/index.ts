import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "@/services/auth";
import { blogApi } from "@/services/blog";
import { languageApi } from "@/services/language";
import { serviceApi } from "@/services/service";
import { siteApi } from "@/services/site";
import { userApi } from "@/services/user";
import { authReducer } from "@/lib/store/features/auth";
import { feedbackApi } from "@/services/feedback";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
    [languageApi.reducerPath]: languageApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [siteApi.reducerPath]: siteApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      blogApi.middleware,
      feedbackApi.middleware,
      languageApi.middleware,
      serviceApi.middleware,
      siteApi.middleware,
      userApi.middleware,
    ),
});

setupListeners(store.dispatch);

export type AppStore = typeof store;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
