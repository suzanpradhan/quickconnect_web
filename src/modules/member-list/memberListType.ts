import { apiPaths } from "@/core/api/apiConstants";
import { baseApi } from "@/core/api/apiQuery";
import { GetAllUsersResponse, Group, Private } from "./memberListApi";

export const memberListApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMemberList: builder.query<GetAllUsersResponse, void>({
      query: () => ({
        url: `${apiPaths.baseUrl}${apiPaths.MemberListUrl}`,
        method: "GET",
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs}`;
      },
      providesTags: (result) =>
        result
          ? [
              { type: "register", id: "ALL" },
              ...result.users.map(
                (user) =>
                  ({
                    type: "register",
                    id: user.id,
                  } as const)
              ),
            ]
          : [{ type: "register", id: "ALL" }],
    }),

    createPrivateRoom: builder.mutation<Private, string>({
      query: (receiverId) => ({
        url: `${apiPaths.baseUrl}${apiPaths.PrivateChatUrl}/${receiverId}`,
        method: "POST",
      }),
      // Invalidating the cache of the member list after creating the private room
      invalidatesTags: [{ type: "register", id: "ALL" }],
    }),

    createGroupRoom: builder.mutation<
      Group,
      { receiverId: string; chatId: string }
    >({
      query: ({ receiverId, chatId }) => ({
        url: `${apiPaths.baseUrl}${apiPaths.GroupUrl}/${chatId}/${receiverId}`,
        method: "POST",
      }),
      // Invalidate the MemberList tag after creating a group room
      invalidatesTags: [{ type: "register", id: "ALL" }],
    }),
  }),

  overrideExisting: false,
});
