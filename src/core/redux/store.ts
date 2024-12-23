import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "@/core/api/apiQuery";
import { profileApi } from "@/modules/profile/profileApi";
import { rtkQueryErrorLogger } from "../api/apiMiddleware";
import { forgotApi } from "@/modules/forgotPassword/forgotAPi";
import { newPasswordApi } from "@/modules/createNewPassword/newPasswordApi";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [forgotApi.reducerPath]: forgotApi.reducer,
    [newPasswordApi.reducerPath]: newPasswordApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApi.middleware)
      .concat(profileApi.middleware)
      .concat(forgotApi.middleware)
      .concat(newPasswordApi.middleware)
      .concat(rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
