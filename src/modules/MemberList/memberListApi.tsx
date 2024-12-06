import { baseApi } from '@/core/api/apiQuery'; 

import { apiPaths } from '@/core/api/apiConstants'; 
import { MemberObject } from './memberListType';

export const memberApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMemberList: builder.query<MemberObject, string>({
      query: (chatId) => ({
        url: `${apiPaths.baseUrl}/${chatId}`, 
        method: 'GET',
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs}`;
      },
    }),
  }),
  overrideExisting: false, 
});
