import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { PlayerStatsData, StatTypeKey } from "../types/playerStats";

// UI State Interface
interface UIState {
  selectedMarket: StatTypeKey;
  viewMode: "grid" | "list";
  filters: {
    league: string[];
    position: string[];
    minOdds: number;
    searchTerm: string;
  };
}

// API State Interface
interface ApiState {
  playerStats: {
    [key: string]: {
      data: PlayerStatsData[] | null;
      isLoading: boolean;
      error: string | null;
      lastFetch: number;
    };
  };
}

// Combined Store State
interface AppState extends UIState, ApiState {
  // UI Actions
  setSelectedMarket: (market: StatTypeKey) => void;
  setViewMode: (mode: "grid" | "list") => void;
  updateFilters: (filters: Partial<UIState["filters"]>) => void;
  setSearchTerm: (term: string) => void;
  addLeagueFilter: (league: string) => void;
  removeLeagueFilter: (league: string) => void;
  addPositionFilter: (position: string) => void;
  removePositionFilter: (position: string) => void;
  setMinOdds: (odds: number) => void;
  resetFilters: () => void;

  // API Actions
  setPlayerStats: (key: string, data: PlayerStatsData[]) => void;
  setLoading: (key: string, loading: boolean) => void;
  setError: (key: string, error: string | null) => void;
  clearCache: (key?: string) => void;

  // Computed Values
  getFilteredStats: (key: string) => PlayerStatsData[];
  isDataStale: (key: string, maxAge?: number) => boolean;
  getApiState: (key: string) => {
    isLoading: boolean;
    error: string | null;
    data: PlayerStatsData[] | null;
  };
}

const defaultFilters: UIState["filters"] = {
  league: [],
  position: [],
  minOdds: 0,
  searchTerm: "",
};

const defaultUIState: UIState = {
  selectedMarket: "SHOTS_ON_TARGET",
  viewMode: "grid",
  filters: defaultFilters,
};

// Create the store
export const useAppStore = create<AppState>()(
  devtools(
    persist(
      immer((set: any, get: any) => ({
        // Initial State
        ...defaultUIState,
        playerStats: {},

        // UI Actions
        setSelectedMarket: (market) => {
          set((state) => {
            state.selectedMarket = market;
          });
        },

        setViewMode: (mode) => {
          set((state) => {
            state.viewMode = mode;
          });
        },

        updateFilters: (newFilters) => {
          set((state) => {
            Object.assign(state.filters, newFilters);
          });
        },

        setSearchTerm: (term) => {
          set((state) => {
            state.filters.searchTerm = term;
          });
        },

        addLeagueFilter: (league) => {
          set((state) => {
            if (!state.filters.league.includes(league)) {
              state.filters.league.push(league);
            }
          });
        },

        removeLeagueFilter: (league) => {
          set((state) => {
            state.filters.league = state.filters.league.filter(
              (l) => l !== league
            );
          });
        },

        addPositionFilter: (position) => {
          set((state) => {
            if (!state.filters.position.includes(position)) {
              state.filters.position.push(position);
            }
          });
        },

        removePositionFilter: (position) => {
          set((state) => {
            state.filters.position = state.filters.position.filter(
              (p) => p !== position
            );
          });
        },

        setMinOdds: (odds) => {
          set((state) => {
            state.filters.minOdds = odds;
          });
        },

        resetFilters: () => {
          set((state) => {
            state.filters = { ...defaultFilters };
          });
        },

        // API Actions
        setPlayerStats: (key, data) => {
          set((state) => {
            if (!state.playerStats[key]) {
              state.playerStats[key] = {
                data: null,
                isLoading: false,
                error: null,
                lastFetch: 0,
              };
            }
            state.playerStats[key].data = data;
            state.playerStats[key].lastFetch = Date.now();
            state.playerStats[key].isLoading = false;
            state.playerStats[key].error = null;
          });
        },

        setLoading: (key, loading) => {
          set((state) => {
            if (!state.playerStats[key]) {
              state.playerStats[key] = {
                data: null,
                isLoading: false,
                error: null,
                lastFetch: 0,
              };
            }
            state.playerStats[key].isLoading = loading;
          });
        },

        setError: (key, error) => {
          set((state) => {
            if (!state.playerStats[key]) {
              state.playerStats[key] = {
                data: null,
                isLoading: false,
                error: null,
                lastFetch: 0,
              };
            }
            state.playerStats[key].error = error;
            state.playerStats[key].isLoading = false;
          });
        },

        clearCache: (key) => {
          set((state) => {
            if (key) {
              delete state.playerStats[key];
            } else {
              state.playerStats = {};
            }
          });
        },

        // Computed Values
        getFilteredStats: (key) => {
          const state = get();
          const stats = state.playerStats[key]?.data || [];
          const { league, position, minOdds, searchTerm } = state.filters;

          return stats.filter((stat) => {
            // Search filter
            if (searchTerm.trim()) {
              const term = searchTerm.toLowerCase();
              const matchesSearch =
                stat.player.name.toLowerCase().includes(term) ||
                stat.player.team.name.toLowerCase().includes(term);
              if (!matchesSearch) return false;
            }

            // League filter
            if (league.length > 0) {
              const gameLeague = stat.game.homeTeam.name; // or however you determine league
              if (
                !league.some((l) =>
                  gameLeague.toLowerCase().includes(l.toLowerCase())
                )
              ) {
                return false;
              }
            }

            // Position filter
            if (position.length > 0) {
              if (!position.includes(stat.player.position)) return false;
            }

            // Min odds filter
            if (minOdds > 0) {
              const mainStat = stat.statistics[0];
              if (!mainStat || mainStat.statValue < minOdds) return false;
            }

            return true;
          });
        },

        isDataStale: (key, maxAge = 30000) => {
          const state = get();
          const apiState = state.playerStats[key];
          if (!apiState || !apiState.data) return true;
          return Date.now() - apiState.lastFetch > maxAge;
        },

        getApiState: (key) => {
          const state = get();
          const apiState = state.playerStats[key];
          return {
            isLoading: apiState?.isLoading || false,
            error: apiState?.error || null,
            data: apiState?.data || null,
          };
        },
      })),
      {
        name: "sports-betting-store",
        // Only persist UI state, not API cache
        partialize: (state) => ({
          selectedMarket: state.selectedMarket,
          viewMode: state.viewMode,
          filters: state.filters,
        }),
      }
    ),
    {
      name: "sports-betting-store",
    }
  )
);

// Selector hooks for better performance
export const useSelectedMarket = () =>
  useAppStore((state) => state.selectedMarket);
export const useViewMode = () => useAppStore((state) => state.viewMode);
export const useFilters = () => useAppStore((state) => state.filters);
export const usePlayerStats = (key: string) =>
  useAppStore((state) => state.getFilteredStats(key));
export const useApiState = (key: string) =>
  useAppStore((state) => state.getApiState(key));
export const useIsDataStale = (key: string, maxAge?: number) =>
  useAppStore((state) => state.isDataStale(key, maxAge));
