import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PlayerStatsApiResponse } from "../types/playerStats";
import { STAT_TYPES } from "../types/playerStats";

export const playerStatsApi = createApi({
  reducerPath: "playerStatsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.squads.game/",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["PlayerStats"],
  endpoints: (builder: any) => ({
    getPlayerStats: builder.query({
      query: () => {
        return `bet/public-props?marketType=player_shots_on_target`;
      },
      providesTags: ["PlayerStats"],
      keepUnusedDataFor: 30, // 30 seconds cache

      refetchOnFocus: true,
      // Transform API response to our stats format
      transformResponse: (response: any): PlayerStatsApiResponse => {
        return {
          props:
            response.props?.map((prop: any) => ({
              groupId: prop.groupId,
              player: {
                id: prop.player.id,
                name: prop.player.name,
                imageUrl: prop.player.imageUrl || "",
                imageUrl128:
                  prop.player.imageUrl128 || prop.player.imageUrl || "",
                position: prop.player.position,
                team: {
                  id: prop.player.team.id,
                  name:
                    prop.game.homeTeam.id === prop.player.team.id
                      ? prop.game.homeTeam.name
                      : prop.game.awayTeam.name,
                  abbreviation:
                    prop.game.homeTeam.id === prop.player.team.id
                      ? prop.game.homeTeam.abbreviation
                      : prop.game.awayTeam.abbreviation,
                },
                number: prop.player.number,
              },
              game: {
                id: prop.game.id,
                startDate: prop.game.startDate,
                homeTeam: prop.game.homeTeam,
                awayTeam: prop.game.awayTeam,
                status: prop.game.status,
                isLive: prop.game.isLive,
              },
              statistics:
                prop.props?.map((statProp: any) => ({
                  id: `${prop.groupId}_${statProp.betPoints}`,
                  statType: STAT_TYPES.SHOTS_ON_TARGET, // Default, will be overridden
                  statValue: statProp.betPoints,
                  displayValue: statProp.betPoints.toString(),
                  isProjected: true,
                  confidence: 0.85, // Default confidence
                })) || [],
              market: prop.market,
            })) || [],
          meta: {
            total: response.props?.length || 0,
            page: 1,
            limit: response.props?.length || 0,
          },
        };
      },
    }),

    // Specific endpoints for different stat types
    getShotsOnTargetStats: builder.query({
      query: () => "bet/public-props?marketType=player_shots_on_target",
      providesTags: ["PlayerStats"],
      keepUnusedDataFor: 30,
      transformResponse: (response: any): PlayerStatsApiResponse => {
        return {
          props:
            response.props?.map((prop: any) => ({
              ...prop,
              statistics:
                prop.props?.map((statProp: any) => ({
                  id: `${prop.groupId}_shots_on_target`,
                  statType: STAT_TYPES.SHOTS_ON_TARGET,
                  statValue: statProp.betPoints,
                  displayValue: statProp.betPoints.toString(),
                  isProjected: true,
                })) || [],
            })) || [],
        };
      },
    }),

    getGoalsStats: builder.query({
      query: () => "bet/public-props?marketType=player_goals",
      providesTags: ["PlayerStats"],
      keepUnusedDataFor: 30,
    }),

    getAssistsStats: builder.query({
      query: () => "bet/public-props?marketType=player_assists",
      providesTags: ["PlayerStats"],
      keepUnusedDataFor: 30,
    }),

    getPassesStats: builder.query({
      query: () => "bet/public-props?marketType=player_passes_completed",
      providesTags: ["PlayerStats"],
      keepUnusedDataFor: 30,
    }),

    getSavesStats: builder.query({
      query: () => "bet/public-props?marketType=player_saves",
      providesTags: ["PlayerStats"],
      keepUnusedDataFor: 30,
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetPlayerStatsQuery,
  useGetShotsOnTargetStatsQuery,
  useGetGoalsStatsQuery,
  useGetAssistsStatsQuery,
  useGetPassesStatsQuery,
  useGetSavesStatsQuery,
} = playerStatsApi;
