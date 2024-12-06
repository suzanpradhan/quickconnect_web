import { baseApi } from '@/core/api/apiQuery'; 
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ChatObject } from './chatListType'; 
import { apiPaths } from '@/core/api/apiConstants'; 

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChatDetails: builder.query<Array<ChatObject>, string>({
      query: (id) => ({
        url: `${apiPaths.baseUrl}${apiPaths.ChatDetailUrl}/${id}`, 
        method: 'GET',
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs}`;
      },
    }),
  }),
  overrideExisting: false, 
});


