import { baseApi } from "@/core/api/apiQuery";

import { apiPaths } from "@/core/api/apiConstants";
export const roomMembersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoomMembers: builder.query<ChatData, string>({
      query: (chatId) => ({
        url: `${apiPaths.baseUrl}/${chatId}`,
        method: "GET",
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs}`;
      },
    }),
  }),
  overrideExisting: false,
});
