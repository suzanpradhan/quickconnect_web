import { apiPaths } from '@/core/api/apiConstants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const newPasswordApi = createApi({
  reducerPath: 'newPasswordApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiPaths.baseUrl,  
  }),
  endpoints: (builder) => ({
    newPassword: builder.mutation({
      query: (values: { resetToken: string; newPassword: string; confirmNewPassword: string }) => ({
        url: apiPaths.createNewPasswordUrl,  
        method: 'POST',
        body: values,  
      }),
    }),
  }),
});

