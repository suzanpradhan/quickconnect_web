import { apiPaths } from "@/core/api/apiConstants";
import { baseApi } from "@/core/api/apiQuery";
import {
  MessageType,
  SendMessageValues,
  SendMessageRequest,
} from "./messageType";

export const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get messages endpoint
    getMessages: builder.query<MessageType[], string>({
      query: (chatId) => ({
        url: `${apiPaths.baseUrl}${apiPaths.MessageUrl}/${chatId}`,
        method: "GET",
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs}`;
      },
      // Automatically refetch data when the chatId changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
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
        console.log("dfgdfgfg", messageId);
        return {
          url: `${apiPaths.baseUrl}${apiPaths.DeleteMessageUrl}/${chatId}/${messageId}`,
          method: "DELETE",
        };
      },
    }),
  }),

  overrideExisting: false,
});
