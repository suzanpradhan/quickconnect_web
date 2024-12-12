
import { apiPaths } from "@/core/api/apiConstants";
import { baseApi } from "@/core/api/apiQuery";
import { GetAllUsersResponse } from "./memberListApi";

export const memberListApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMemberList: builder.query<GetAllUsersResponse, void>({
      query: () => ({
        url: `${apiPaths.baseUrl}${apiPaths.MemberListUrl}`,
        method: 'GET',
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs}`;
      },
    })

  }),
  
  overrideExisting: false,
});
