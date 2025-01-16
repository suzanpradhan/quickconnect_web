import { apiPaths } from "@/core/api/apiConstants";
import { baseApi } from "@/core/api/apiQuery";
import { RegisterFormInputs } from "./registerType";
const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<any, RegisterFormInputs>({
      query: (payload) => {
        const data = {
          name:payload.name,
          email: payload.email,
          password: payload.password,
          confirmPassword:payload.confirmPassword
        };
        return {
          url: apiPaths.registerUrl,
          body: data,
          method: "POST",
        };
      },
    }),
  }),
  overrideExisting: true,
});
export default authApi;
