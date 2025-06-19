import React, { useState } from "react";
import {
  Loader2,
  RefreshCw,
  Target,
  Goal,
  Users,
  TrendingUp,
  HandMetal,
  Grid,
  List,
} from "lucide-react";
import { usePlayerStats } from "../../hooks/usePlayerStats";
import { STAT_TYPES, type StatTypeKey } from "../../types/playerStats";
import HorizontalPlayerStats from "./HorizontalPlayerStats";
import AdvancedHorizontalScroll from "./AdvancedHorizontalScroll";
import InfiniteMarquee from "./infiniteMarquee";
import TripleMarquee from "./tripleMarquee";

interface SimplePlayerStatsLoaderProps {
  statType?: StatTypeKey;
  maxCards?: number;
  onStatClick?: (
    playerId: string,
    statId: string,
    action: "more" | "less"
  ) => void;
  layoutMode?: "grid" | "horizontal" | "advanced-horizontal";
  autoScroll?: boolean;
}

const SimplePlayerStatsLoader: React.FC<SimplePlayerStatsLoaderProps> = ({
  statType = "GOALS",
  maxCards = 20,
  onStatClick,
  layoutMode = "grid",
  autoScroll = true,
}) => {
  const [selectedStatType, setSelectedStatType] =
    useState<StatTypeKey>(statType);
  const [currentLayoutMode, setCurrentLayoutMode] = useState(layoutMode);
  const { data, isLoading, error, refetch } = usePlayerStats(selectedStatType);

  // Stat type options
  const statTypeOptions = [
    { key: "GOALS" as StatTypeKey, icon: Goal, label: "Goals" },
    {
      key: "SHOTS_ON_TARGET" as StatTypeKey,
      icon: Target,
      label: "Shots on Target",
    },
    { key: "ASSISTS" as StatTypeKey, icon: Users, label: "Assists" },
    {
      key: "PASSES_COMPLETED" as StatTypeKey,
      icon: TrendingUp,
      label: "Passes",
    },
    { key: "SAVES" as StatTypeKey, icon: HandMetal, label: "Saves" },
  ];

  // Layout mode options
  const layoutOptions = [
    { key: "grid", icon: Grid, label: "Grid" },
    { key: "horizontal", icon: List, label: "Horizontal" },
    { key: "advanced-horizontal", icon: TrendingUp, label: "Advanced Scroll" },
  ];

  // Handlers
  const handleMoreClick = (playerId: string, statId: string) => {
    onStatClick?.(playerId, statId, "more");
  };

  const handleLessClick = (playerId: string, statId: string) => {
    onStatClick?.(playerId, statId, "less");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-center mb-8">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500 mr-3" />
          <span className="text-slate-400 text-lg">
            Loading player statistics...
          </span>
        </div>

        {/* Loading skeleton based on layout mode */}
        {currentLayoutMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-slate-800 rounded-xl p-4 min-h-[160px] border border-slate-700 animate-pulse"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-slate-700 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-slate-700 rounded mb-2"></div>
                    <div className="h-3 bg-slate-700 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <div className="h-8 bg-slate-700 rounded w-16 mb-2"></div>
                    <div className="h-4 bg-slate-700 rounded w-24"></div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="h-8 bg-slate-700 rounded w-20"></div>
                    <div className="h-8 bg-slate-700 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex gap-6 overflow-hidden px-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-slate-800 rounded-xl p-4 min-h-[160px] w-[320px] border border-slate-700 animate-pulse flex-shrink-0"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-slate-700 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-slate-700 rounded mb-2"></div>
                    <div className="h-3 bg-slate-700 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <div className="h-8 bg-slate-700 rounded w-16 mb-2"></div>
                    <div className="h-4 bg-slate-700 rounded w-24"></div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="h-8 bg-slate-700 rounded w-20"></div>
                    <div className="h-8 bg-slate-700 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">⚠</span>
          </div>
          <h3 className="text-lg font-medium text-white mb-2">
            Failed to load statistics
          </h3>
          <p className="text-slate-400 mb-4">{error}</p>
          <button
            onClick={refetch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2 mx-auto"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Limit displayed results
  const displayData = data.slice(0, maxCards);

  return (
    <div className="w-full space-y-6">
      {/* Header with Stat Type Selector and Layout Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        {/* <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Player {STAT_TYPES[selectedStatType].displayName}
          </h2>
          <p className="text-slate-400">
            {displayData.length} players • Live projections
          </p>
        </div> */}

        {/* Controls */}
        {/* <div className="flex flex-col gap-4">
          {/* Stat Type Selector */}
        {/* <div className="flex gap-2 flex-wrap">
          {statTypeOptions.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setSelectedStatType(key)}
              className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${
                    selectedStatType === key
                      ? "bg-blue-600 text-white"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }
                `}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div> */}

        {/* Layout Mode Selector */}
        {/* <div className="flex gap-2 items-center">
          <span className="text-slate-400 text-sm">Layout:</span>
          {layoutOptions.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setCurrentLayoutMode(key as any)}
              className={`
                  flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors
                  ${
                    currentLayoutMode === key
                      ? "bg-green-600 text-white"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }
                `}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}

          <button
            onClick={refetch}
            className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
          >
            <RefreshCw size={14} />
            Refresh
          </button>
        </div> */}
        {/* </div> */}
      </div>

      {/* Dynamic Layout Rendering */}
      {displayData.length > 0 ? (
        <>
          {currentLayoutMode === "grid" && (
            <TripleMarquee
              displayData={displayData}
              onMoreClick={handleMoreClick}
              onLessClick={handleLessClick}
              showControls={true}
            />
          )}

          {/* {currentLayoutMode === "horizontal" && (
            <HorizontalPlayerStats
              displayData={displayData}
              onMoreClick={handleMoreClick}
              onLessClick={handleLessClick}
            />
          )}

          {currentLayoutMode === "advanced-horizontal" && (
            <AdvancedHorizontalScroll
              displayData={displayData}
              onMoreClick={handleMoreClick}
              onLessClick={handleLessClick}
              autoScroll={autoScroll}
            />
          )} */}
        </>
      ) : (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-lg font-medium text-white mb-2">
            No statistics available
          </h3>
          <p className="text-slate-400">
            No player data found for the selected stat type.
          </p>
        </div>
      )}

      {/* Live Data Indicator */}
      {/* <div className="bg-slate-800 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-400">
            Displaying {displayData.length} players • Layout:{" "}
            {currentLayoutMode}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Live data from Squads API
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default SimplePlayerStatsLoader;
