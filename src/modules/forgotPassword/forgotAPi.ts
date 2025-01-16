import { apiPaths, setHeaders } from '@/core/api/apiConstants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const forgotApi = createApi({
  reducerPath: 'forgotApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiPaths.baseUrl,  
  }),
  endpoints: (builder) => ({
    forgotPassword: builder.mutation({
      query: (email: string) => ({
        url: apiPaths.forgotPasswordUrl,  
        method: 'POST',
        body: { email }, 
      }),
    }),
  }),
});


