import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  EndpointBuilder,
} from "@reduxjs/toolkit/query";
import type { PlayerStatsApiResponse } from "../types/playerStats";
import { STAT_TYPES } from "../types/playerStats";

interface RawSquadsApiResponse {
  props?: RawPlayerProp[];
}

interface RawPlayerProp {
  groupId: string;
  player: {
    id: string;
    name: string;
    imageUrl?: string;
    imageUrl128?: string;
    position: string;
    team: {
      id: string;
    };
    number: string | null;
  };
  game: {
    id: string;
    startDate: string;
    homeTeam: {
      id: string;
      name: string;
      abbreviation: string;
    };
    awayTeam: {
      id: string;
      name: string;
      abbreviation: string;
    };
    status: string;
    isLive: boolean;
  };
  props?: RawStatProp[];
  market: {
    id: string;
    name: string;
  };
}

interface RawStatProp {
  betPoints: number;
  lines?: Array<{
    id: string;
    selectionLine: string;
    isAvailable: boolean;
  }>;
  type: string;
}

export const playerStatsApi = createApi({
  reducerPath: "playerStatsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.squads.game/",
    prepareHeaders: (headers: Headers) => {
      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["PlayerStats"],
  endpoints: (
    builder: EndpointBuilder<
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      "PlayerStats",
      "playerStatsApi"
    >
  ) => ({
    getPlayerStats: builder.query<PlayerStatsApiResponse, void>({
      query: () => {
        return `bet/public-props?marketType=player_shots_on_target`;
      },
      providesTags: ["PlayerStats"],
      keepUnusedDataFor: 30,
      transformResponse: (
        response: RawSquadsApiResponse
      ): PlayerStatsApiResponse => {
        return {
          props:
            response.props?.map((prop: RawPlayerProp) => ({
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
                prop.props?.map((statProp: RawStatProp) => ({
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
    getShotsOnTargetStats: builder.query<PlayerStatsApiResponse, void>({
      query: () => "bet/public-props?marketType=player_shots_on_target",
      providesTags: ["PlayerStats"],
      keepUnusedDataFor: 30,
      transformResponse: (
        response: RawSquadsApiResponse
      ): PlayerStatsApiResponse => {
        return {
          props:
            response.props?.map((prop: RawPlayerProp) => ({
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
                prop.props?.map((statProp: RawStatProp) => ({
                  id: `${prop.groupId}_shots_on_target`,
                  statType: STAT_TYPES.SHOTS_ON_TARGET,
                  statValue: statProp.betPoints,
                  displayValue: statProp.betPoints.toString(),
                  isProjected: true,
                  confidence: 0.85,
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

    getGoalsStats: builder.query<PlayerStatsApiResponse, void>({
      query: () => "bet/public-props?marketType=player_goals",
      providesTags: ["PlayerStats"],
      keepUnusedDataFor: 30,
      transformResponse: (
        response: RawSquadsApiResponse
      ): PlayerStatsApiResponse => {
        return {
          props:
            response.props?.map((prop: RawPlayerProp) => ({
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
                prop.props?.map((statProp: RawStatProp) => ({
                  id: `${prop.groupId}_goals`,
                  statType: STAT_TYPES.GOALS,
                  statValue: statProp.betPoints,
                  displayValue: statProp.betPoints.toString(),
                  isProjected: true,
                  confidence: 0.85,
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

    getAssistsStats: builder.query<PlayerStatsApiResponse, void>({
      query: () => "bet/public-props?marketType=player_assists",
      providesTags: ["PlayerStats"],
      keepUnusedDataFor: 30,
      transformResponse: (
        response: RawSquadsApiResponse
      ): PlayerStatsApiResponse => {
        return {
          props:
            response.props?.map((prop: RawPlayerProp) => ({
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
                prop.props?.map((statProp: RawStatProp) => ({
                  id: `${prop.groupId}_assists`,
                  statType: STAT_TYPES.ASSISTS,
                  statValue: statProp.betPoints,
                  displayValue: statProp.betPoints.toString(),
                  isProjected: true,
                  confidence: 0.85,
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

    getPassesStats: builder.query<PlayerStatsApiResponse, void>({
      query: () => "bet/public-props?marketType=player_passes_completed",
      providesTags: ["PlayerStats"],
      keepUnusedDataFor: 30,
      transformResponse: (
        response: RawSquadsApiResponse
      ): PlayerStatsApiResponse => {
        return {
          props:
            response.props?.map((prop: RawPlayerProp) => ({
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
                prop.props?.map((statProp: RawStatProp) => ({
                  id: `${prop.groupId}_passes`,
                  statType: STAT_TYPES.PASSES_COMPLETED,
                  statValue: statProp.betPoints,
                  displayValue: statProp.betPoints.toString(),
                  isProjected: true,
                  confidence: 0.85,
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

    getSavesStats: builder.query<PlayerStatsApiResponse, void>({
      query: () => "bet/public-props?marketType=player_saves",
      providesTags: ["PlayerStats"],
      keepUnusedDataFor: 30,
      transformResponse: (
        response: RawSquadsApiResponse
      ): PlayerStatsApiResponse => {
        return {
          props:
            response.props?.map((prop: RawPlayerProp) => ({
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
                prop.props?.map((statProp: RawStatProp) => ({
                  id: `${prop.groupId}_saves`,
                  statType: STAT_TYPES.SAVES,
                  statValue: statProp.betPoints,
                  displayValue: statProp.betPoints.toString(),
                  isProjected: true,
                  confidence: 0.85,
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

// Export types for external use
export type { RawSquadsApiResponse, RawPlayerProp, RawStatProp };
