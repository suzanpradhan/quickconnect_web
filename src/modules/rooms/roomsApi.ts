import { baseApi } from "@/core/api/apiQuery";
import { CreateRoomValues } from "./roomstype"; 
import { apiPaths } from "@/core/api/apiConstants";

export const roomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRoom: builder.mutation<{ chatId: string }, CreateRoomValues>({
      query: (payload) => {
        const token = localStorage.getItem("authToken");

        return {
          url: `${apiPaths.baseUrl}${apiPaths.CreatRoomsUrl}`,
          method: "POST",
          body: payload,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      // Transform the response to just return chatId
      transformResponse: (response: { chatId: string }) => response,
    }),
  }),
  overrideExisting: true, 
});

export default roomApi;
