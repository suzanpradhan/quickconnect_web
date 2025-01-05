import { apiPaths } from "@/core/api/apiConstants";
import { baseApi } from "@/core/api/apiQuery";
import {
  MessageType,
  SendMessageValues,
  SendMessageRequest,
} from "./messageType";
import build from "next/dist/build";
import {
  PaginationInfo,
  PaginatedResponseType,
} from "@/core/types/responseTypes";

export const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get messages endpoint
    getMessages: builder.query<
      PaginatedResponseType<MessageType>,
      { chatId: string; limit: number; page: number }
    >({
      query: ({ chatId, limit, page }) => ({
        url: `${apiPaths.baseUrl}${apiPaths.MessageUrl}/${chatId}`,
        method: "GET",
        params: {
          limit,
          page,
        },
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        console.log(queryArgs.chatId);

        return `${endpointName}-${queryArgs.chatId}`;
      },
    }),
    // Send message endpoint
    sendMessage: builder.mutation<void, SendMessageRequest>({
      query: ({ chatId, message, senderId }) => {
        return {
          url: `${apiPaths.baseUrl}${apiPaths.SendmessageUrl}/${chatId}`,
          method: "POST",
          body: {
            chatId,
            message,
            senderId,
          },
        };
      },
    }),

    // delete message by messageId
    deleteMessage: builder.mutation<
      void,
      { messageId: string; chatId: string }
    >({
      query: ({ messageId, chatId }) => {
        return {
          url: `${apiPaths.baseUrl}${apiPaths.DeleteMessageUrl}/${chatId}/${messageId}`,
          method: "DELETE",
        };
      },
    }),
  }),

  overrideExisting: false,
});
