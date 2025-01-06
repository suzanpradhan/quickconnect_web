import { baseApi } from "@/core/api/apiQuery";

import { apiPaths } from "@/core/api/apiConstants";
export const roomMembersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoomMembers: builder.query<ChatData, string>({
      query: (chatId) => ({
        url: `${apiPaths.baseUrl}/${chatId}`,
        method: "GET",
      }),

      providesTags: (result) =>
        result
          ? [
              { type: "register", id: "ALL" },
              ...result.members.map(
                (user) =>
                  ({
                    type: "register",
                    id: user.id,
                  } as const)
              ),
            ]
          : [{ type: "register", id: "ALL" }],

      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs}`;
      },
    }),
  }),
  overrideExisting: false,
});
