export interface PlayerStatistic {
  id: string;
  statType: StatType;
  statValue: number;
  displayValue: string;
  isProjected?: boolean;
  confidence?: number;
}

export interface StatType {
  id: string;
  name: string;
  displayName: string;
  unit?: string;
  category: StatCategory;
  description?: string;
}

export type StatCategory =
  | "shooting"
  | "passing"
  | "defensive"
  | "goalkeeping"
  | "general";

export interface PlayerStatsData {
  groupId: string;
  player: {
    id: string;
    name: string;
    imageUrl: string;
    imageUrl128: string;
    position: string;
    team: {
      id: string;
      name: string;
      abbreviation: string;
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
  statistics: PlayerStatistic[];
  market: {
    id: string;
    name: string;
  };
}

export interface PlayerStatsApiResponse {
  props: PlayerStatsData[];
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}

export const STAT_TYPES = {
  SHOTS_ON_TARGET: {
    id: "player_shots_on_target",
    name: "shots_on_target",
    displayName: "Shots on Target",
    category: "shooting" as const,
    description:
      "Shots that would go in the goal if not blocked by goalkeeper or defender",
  },
  GOALS: {
    id: "player_goals",
    name: "goals",
    displayName: "Goals",
    category: "shooting" as const,
    description: "Goals scored by the player",
  },
  ASSISTS: {
    id: "player_assists",
    name: "assists",
    displayName: "Assists",
    category: "passing" as const,
    description: "Passes that directly lead to goals",
  },
  PASSES_COMPLETED: {
    id: "player_passes_completed",
    name: "passes_completed",
    displayName: "Passes Completed",
    category: "passing" as const,
    description: "Successfully completed passes",
  },
  SAVES: {
    id: "player_saves",
    name: "saves",
    displayName: "Saves",
    category: "goalkeeping" as const,
    description: "Shots saved by the goalkeeper",
  },
  TACKLES: {
    id: "player_tackles",
    name: "tackles",
    displayName: "Tackles",
    category: "defensive" as const,
    description: "Successful tackles made by the player",
  },
} as const;

export type StatTypeKey = keyof typeof STAT_TYPES;
