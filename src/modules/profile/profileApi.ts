import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProfileDataType, ProfileType } from "./profileType";
import { apiPaths, setHeaders } from "@/core/api/apiConstants";
import { PaginatedResponseType } from "@/core/types/responseTypes";
import { baseApi } from "@/core/api/apiQuery";
import { toast } from "react-toastify";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfileByToken: builder.query<ProfileDataType, void>({
      query: () => ({
        url: `${apiPaths.myProfileUrl}`,
        method: "GET",
      }),
    }),

    updateProfileByToken: builder.mutation<
      ProfileDataType,
      {
        name: string;
        phoneNumber: string;
        gender: string;
        avatar: File | string | null;
      }
    >({
      query: (payload) => {
        var formData = new FormData();
        formData.append("name", payload.name);
        formData.append("phoneNumber", payload.phoneNumber);
        if (payload.avatar) formData.append("avatar", payload.avatar);
        formData.append("gender", payload.gender);
        return {
          url: `${apiPaths.updateProfileUrl}`,
          method: "PATCH",
          body: formData,
          prepareHeaders: async (headers: Headers) => await setHeaders(headers),
        };
      },
      async onQueryStarted(payload, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("profile Updated");
        } catch (err) {
          console.log(err);
          toast.error("Profile Updated failed");
        }
      },
    }),
  }),
});

export default profileApi;
