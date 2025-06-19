import { useState, useEffect, useCallback } from "react";
import type { PlayerStatsData, StatTypeKey } from "../types/playerStats";
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
    team: { id: string };
    number: string | null;
  };
  game: {
    id: string;
    startDate: string;
    homeTeam: { id: string; name: string; abbreviation: string };
    awayTeam: { id: string; name: string; abbreviation: string };
    status: string;
    isLive: boolean;
  };
  props?: Array<{ betPoints: number; type: string }>;
  market: { id: string; name: string };
}

interface UsePlayerStatsState {
  data: PlayerStatsData[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const transformApiData = (
  response: RawSquadsApiResponse,
  statType: StatTypeKey
): PlayerStatsData[] => {
  const statTypeConfig = STAT_TYPES[statType];

  return (
    response.props?.map((prop: RawPlayerProp) => ({
      groupId: prop.groupId,
      player: {
        id: prop.player.id,
        name: prop.player.name,
        imageUrl: prop.player.imageUrl || "",
        imageUrl128: prop.player.imageUrl128 || prop.player.imageUrl || "",
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
        prop.props?.map((statProp, index) => ({
          id: `${prop.groupId}_${statType.toLowerCase()}_${index}`,
          statType: statTypeConfig,
          statValue: statProp.betPoints,
          displayValue: statProp.betPoints.toString(),
          isProjected: true,
          confidence: 0.85,
        })) || [],
      market: prop.market,
    })) || []
  );
};

export const usePlayerStats = (statType: StatTypeKey): UsePlayerStatsState => {
  const [data, setData] = useState<PlayerStatsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const marketType = STAT_TYPES[statType].id;
      const response = await fetch(
        `https://api.squads.game/bet/public-props?marketType=${marketType}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch: ${response.status} ${response.statusText}`
        );
      }

      const rawData: RawSquadsApiResponse = await response.json();
      const transformedData = transformApiData(rawData, statType);

      setData(transformedData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      console.error("Error fetching player stats:", err);
    } finally {
      setIsLoading(false);
    }
  }, [statType]);

  // Fetch on mount and when statType changes
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchStats,
  };
};

export const usePlayerGoals = () => usePlayerStats("GOALS");
export const usePlayerShotsOnTarget = () => usePlayerStats("SHOTS_ON_TARGET");
export const usePlayerAssists = () => usePlayerStats("ASSISTS");
export const usePlayerPasses = () => usePlayerStats("PASSES_COMPLETED");
export const usePlayerSaves = () => usePlayerStats("SAVES");
