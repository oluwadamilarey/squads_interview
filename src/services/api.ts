import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  EndpointBuilder,
} from "@reduxjs/toolkit/query";
import type { SquadsApiResponse } from "../types";

interface GetPlayerPropsParams {
  marketType: string;
}

interface ApiErrorResponse {
  status: number;
  data?: {
    message?: string;
    [key: string]: unknown;
  };
  message: string;
}

export const squadsApi = createApi({
  reducerPath: "squadsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.squads.game/",
    prepareHeaders: (headers: Headers) => {
      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
      // Add authentication headers here if needed
      // headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["PlayerProps"],
  endpoints: (
    builder: EndpointBuilder<
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      "PlayerProps",
      "squadsApi"
    >
  ) => ({
    getPlayerShotsOnTarget: builder.query<SquadsApiResponse, void>({
      query: () => "bet/public-props?marketType=player_shots_on_target",
      providesTags: ["PlayerProps"],
      keepUnusedDataFor: 30,
      transformResponse: (response: SquadsApiResponse): SquadsApiResponse => {
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
      transformErrorResponse: (
        response: FetchBaseQueryError
      ): ApiErrorResponse => {
        return {
          status: typeof response.status === "number" ? response.status : 500,
          data: response.data as { message?: string; [key: string]: unknown },
          message:
            (response.data as { message?: string })?.message ||
            "Failed to fetch data",
        };
      },
    }),

    // Future endpoints can be added here
    getPlayerProps: builder.query<SquadsApiResponse, GetPlayerPropsParams>({
      query: ({ marketType }: GetPlayerPropsParams) =>
        `bet/public-props?marketType=${marketType}`,
      providesTags: ["PlayerProps"],
      keepUnusedDataFor: 30,
      transformResponse: (response: SquadsApiResponse): SquadsApiResponse => {
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
      transformErrorResponse: (
        response: FetchBaseQueryError
      ): ApiErrorResponse => {
        return {
          status: typeof response.status === "number" ? response.status : 500,
          data: response.data as { message?: string; [key: string]: unknown },
          message:
            (response.data as { message?: string })?.message ||
            "Failed to fetch data",
        };
      },
    }),

    // Additional typed endpoints for different market types
    getPlayerGoals: builder.query<SquadsApiResponse, void>({
      query: () => "bet/public-props?marketType=player_goals",
      providesTags: ["PlayerProps"],
      keepUnusedDataFor: 30,
    }),

    getPlayerAssists: builder.query<SquadsApiResponse, void>({
      query: () => "bet/public-props?marketType=player_assists",
      providesTags: ["PlayerProps"],
      keepUnusedDataFor: 30,
    }),

    getPlayerPasses: builder.query<SquadsApiResponse, void>({
      query: () => "bet/public-props?marketType=player_passes",
      providesTags: ["PlayerProps"],
      keepUnusedDataFor: 30,
    }),

    // Generic endpoint with market type parameter
    getMarketData: builder.query<
      SquadsApiResponse,
      { marketType: string; filters?: Record<string, unknown> }
    >({
      query: ({ marketType, filters = {} }) => {
        const params = new URLSearchParams({ marketType });

        // Add optional filters to query params
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, String(value));
          }
        });

        return `bet/public-props?${params.toString()}`;
      },
      providesTags: ["PlayerProps"],
      keepUnusedDataFor: 30,
      transformResponse: (response: SquadsApiResponse): SquadsApiResponse => {
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
    }),
  }),
});

export const {
  useGetPlayerShotsOnTargetQuery,
  useGetPlayerPropsQuery,
  useGetPlayerGoalsQuery,
  useGetPlayerAssistsQuery,
  useGetPlayerPassesQuery,
  useGetMarketDataQuery,
} = squadsApi;

// Export types for external use
export type { GetPlayerPropsParams, ApiErrorResponse };
