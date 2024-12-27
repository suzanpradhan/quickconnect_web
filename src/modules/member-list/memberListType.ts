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
    }),

    createPrivateRoom: builder.mutation<Private, string>({
      query: (receiverId) => ({
        url: `${apiPaths.baseUrl}${apiPaths.PrivateChatUrl}/${receiverId}`,
        method: "POST",
      }),
    }),

    createGroupRoom: builder.mutation<
      Group,
      { receiverId: string; chatId: string }
    >({
      query: ({ receiverId, chatId }) => ({
        url: `${apiPaths.baseUrl}${apiPaths.GroupUrl}/${chatId}/${receiverId}`,
        method: "POST",
      }),
    }),
  }),

  overrideExisting: false,
});
