import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { SquadsApiResponse } from "../types";

export const squadsApi = createApi({
  reducerPath: "squadsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.squads.game/",
    prepareHeaders: (headers: any) => {
      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
      //authentication headers here if needed
      // headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["PlayerProps"],
  endpoints: (builder: any) => ({
    getPlayerShotsOnTarget: builder.query({
      query: () => "bet/public-props?marketType=player_shots_on_target",
      providesTags: ["PlayerProps"],
      keepUnusedDataFor: 30,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      transformResponse: (response: SquadsApiResponse) => {
        return {
          ...response,
          props:
            response.props?.map((prop) => ({
              ...prop,
              player: {
                ...prop.player,
                imageUrl: prop.player.imageUrl || prop.player.imageUrl128 || "",
                imageUrl128:
                  prop.player.imageUrl128 || prop.player.imageUrl || "",
              },
            })) || [],
        };
      },
      transformErrorResponse: (response: any) => {
        return {
          status: response.status,
          data: response.data,
          message: response.data?.message || "Failed to fetch data",
        };
      },
    }),
    // Future endpoints can be added here
    getPlayerProps: builder.query({
      query: ({ marketType }: any) =>
        `bet/public-props?marketType=${marketType}`,
      providesTags: ["PlayerProps"],
      keepUnusedDataFor: 30,
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetPlayerShotsOnTargetQuery, useGetPlayerPropsQuery } =
  squadsApi;
