import { apiPaths } from "@/core/api/apiConstants";
import { baseApi } from "@/core/api/apiQuery";
import { resetPasswordType } from "./resetType";

const resetPasswordApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    resetPassword: builder.mutation<any, resetPasswordType>({
      query: (payload) => {
        const data = {
          oldPassword: payload.oldPassword,
          newPassword: payload.newPassword,
          confirmNewPassword: payload.confirmNewPassword,
        };
        return {
          url: apiPaths.resetPasswordUrl, 
          body: data,
          method: "POST",
        };
      },
    }),
  }),
  overrideExisting: true,
});

export default resetPasswordApi;
