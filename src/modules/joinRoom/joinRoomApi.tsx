import { apiPaths } from "@/core/api/apiConstants";
import { baseApi } from "@/core/api/apiQuery";
import { JoinRoomRequest } from "./joinRoomType";
export const joinRoomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    joinRoom: builder.mutation<void, JoinRoomRequest>({
      query: ({ chatId, token }) => {
        
        return {
          url: `${apiPaths.baseUrl}${apiPaths.JoinRoomUrl}/${chatId}`,
          method: "POST",
        };
      },
    }),
  }),
  overrideExisting: false,
});

export default joinRoomApi;
