
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProfileDataType, ProfileType } from './profileType';
import { apiPaths, setHeaders } from '@/core/api/apiConstants';
import { PaginatedResponseType } from '@/core/types/responseTypes';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiPaths.serverUrl, 
    prepareHeaders: async (headers) => {
      await setHeaders(headers);
      return headers;
    },
  }),
  endpoints: (builder) => ({
   
    getProfileByToken: builder.query<ProfileDataType, number>({
      query: (pageIndex) => ({
        url: `${apiPaths.myProfileUrl}?page=${pageIndex}`,
        method: "GET",
      }),
    }),

    updateProfileByToken: builder.mutation<ProfileDataType, { name: string; phoneNumber: string; gender: string }>({
      query: ({ name, phoneNumber, gender }) => {console.log(name, phoneNumber, gender); return ({
        url: apiPaths.updateProfileUrl, 
        method: 'PATCH',
        body: { name, phoneNumber, gender }, 
      })} ,
    }),
  }),
});

export default profileApi;

