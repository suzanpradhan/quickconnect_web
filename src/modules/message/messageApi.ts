
import { apiPaths } from "@/core/api/apiConstants";
import { baseApi } from "@/core/api/apiQuery";
import { MessageType, SendMessageValues, SendMessageRequest } from "./messageType";

export const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query<MessageType[], string>({
      query: (chatId) => ({
        url: `${apiPaths.baseUrl}${apiPaths.MessageUrl}/${chatId}`,
        method: 'GET',
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs}`;
      },
    }),

    sendMessage: builder.mutation<void, SendMessageRequest>({
      query: ({ chatId, token, message }) => {
        return {
          url: `${apiPaths.baseUrl}${apiPaths.SendmessageUrl}/${chatId}`,
          method: "POST",
          body: {
            chatId,
            message,
            token,
            

          },
        };
      },
    }),

  }),
  
  overrideExisting: false,
});
