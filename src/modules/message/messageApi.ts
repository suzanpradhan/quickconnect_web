import { apiPaths } from "@/core/api/apiConstants";
import { baseApi } from "@/core/api/apiQuery";
import { MessageType } from "./messageType";

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

  }),
  
  overrideExisting: false, 
});
