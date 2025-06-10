import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { UIState } from "../../types";

const initialState: UIState = {
  selectedMarket: "player_shots_on_target",
  viewMode: "grid",
  filters: {
    league: [],
    position: [],
    minOdds: 0,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSelectedMarket: (state, action: PayloadAction<string>) => {
      state.selectedMarket = action.payload;
    },
    setViewMode: (state, action: PayloadAction<"grid" | "list">) => {
      state.viewMode = action.payload;
    },
    updateFilters: (
      state,
      action: PayloadAction<Partial<UIState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    addLeagueFilter: (state, action: PayloadAction<string>) => {
      if (!state.filters.league.includes(action.payload)) {
        state.filters.league.push(action.payload);
      }
    },
    removeLeagueFilter: (state, action: PayloadAction<string>) => {
      state.filters.league = state.filters.league.filter(
        (league) => league !== action.payload
      );
    },
    addPositionFilter: (state, action: PayloadAction<string>) => {
      if (!state.filters.position.includes(action.payload)) {
        state.filters.position.push(action.payload);
      }
    },
    removePositionFilter: (state, action: PayloadAction<string>) => {
      state.filters.position = state.filters.position.filter(
        (position) => position !== action.payload
      );
    },
    setMinOdds: (state, action: PayloadAction<number>) => {
      state.filters.minOdds = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    resetUIState: (state) => {
      return initialState;
    },
  },
});

export const {
  setSelectedMarket,
  setViewMode,
  updateFilters,
  addLeagueFilter,
  removeLeagueFilter,
  addPositionFilter,
  removePositionFilter,
  setMinOdds,
  resetFilters,
  resetUIState,
} = uiSlice.actions;

export default uiSlice.reducer;
