import React, { memo, useMemo } from "react";
import { ChevronUp, ChevronDown, Clock, TrendingUp } from "lucide-react";
import type { PlayerStatsData } from "../../types/playerStats";

interface PlayerStatCardProps {
  playerData: PlayerStatsData;
  onMoreClick?: (playerId: string, statId: string) => void;
  onLessClick?: (playerId: string, statId: string) => void;
  showProjection?: boolean;
  compact?: boolean;
}

const PlayerStatCard = memo<PlayerStatCardProps>(
  ({
    playerData,
    onMoreClick,
    onLessClick,
    showProjection = true,
    compact = false,
  }) => {
    const { player, game, statistics } = playerData;

    // Use first available statistic
    const displayStat = statistics[0];

    // Memoize computed values
    const gameInfo = useMemo(() => {
      const opponent =
        player.team.id === game.homeTeam.id ? game.awayTeam : game.homeTeam;
      const gameDate = new Date(game.startDate);
      const isHome = player.team.id === game.homeTeam.id;

      return {
        opponent: opponent.name,
        isHome,
        formattedDate: gameDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }),
      };
    }, [player.team.id, game]);

    const playerImage = player.imageUrl128 || player.imageUrl || "";

    const handleMoreClick = () => {
      if (onMoreClick && displayStat) {
        onMoreClick(player.id, displayStat.id);
      }
    };

    const handleLessClick = () => {
      if (onLessClick && displayStat) {
        onLessClick(player.id, displayStat.id);
      }
    };

    const formatPosition = (position: string): string => {
      const positionMap: Record<string, string> = {
        F: "Forward",
        M: "Midfielder",
        D: "Defender",
        G: "Goalkeeper",
        GK: "Goalkeeper",
      };
      return positionMap[position] || position;
    };

    if (!displayStat) {
      return null;
    }

    // Compact version for list views
    if (compact) {
      return (
        <div className="bg-slate-800 rounded-lg p-3 border border-slate-700 hover:border-slate-600 transition-colors w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-700 flex-shrink-0">
                {playerImage ? (
                  <img
                    src={playerImage}
                    alt={player.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-slate-700 flex items-center justify-center text-slate-400 text-xs">
                    {player.name.substring(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <p className="font-medium text-white text-sm">{player.name}</p>
                <p className="text-xs text-slate-400">
                  {player.team.name} • {displayStat.statType.displayName}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-white">
                {displayStat.displayValue}
              </div>
              <div className="text-xs text-slate-400">projected</div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="relative bg-slate-800 rounded-xl p-4 min-h-[100px] border border-slate-700 hover:border-slate-600 transition-all duration-200 hover:shadow-lg w-full">
        {/* Live Game Indicator */}
        {game.isLive && (
          <div className="absolute top-3 left-3 z-10">
            <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              LIVE
            </div>
          </div>
        )}

        {/* Main Card Layout - Optimized Flex Row */}
        <div className="flex items-center gap-3 mt-2">
          {/* Player Image Section - Fixed Size */}
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-700 flex-shrink-0">
            {playerImage ? (
              <img
                src={playerImage}
                alt={player.name}
                className="w-full h-full object-cover transition-opacity duration-200"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="w-full h-full bg-slate-700 flex items-center justify-center text-slate-400 text-sm font-bold">
                {player.name.substring(0, 2).toUpperCase()}
              </div>
            )}
          </div>

          {/* Player Info Section - Flexible with proper min-width */}
          <div className="flex-1 min-w-0 max-w-[140px]">
            <h3 className="font-semibold text-white text-sm leading-tight truncate">
              {player.name}
            </h3>
            <p className="text-slate-400 text-xs leading-tight truncate">
              {player.team.name} - {formatPosition(player.position)}
            </p>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <span className="truncate">
                {gameInfo.isHome ? "vs." : "@"} {gameInfo.opponent}
              </span>
              <span>•</span>
              <div className="flex items-center gap-1 truncate">
                <Clock size={8} />
                <span className="truncate">{gameInfo.formattedDate}</span>
              </div>
            </div>
          </div>

          {/* Stat Display - Compact but readable */}
          <div className="text-center flex-shrink-0 min-w-[50px]">
            <div className="text-2xl font-bold text-white leading-tight">
              {displayStat.displayValue}
            </div>
            <div className="text-xs text-slate-400 leading-tight">
              {displayStat.statType.displayName}
            </div>
            {displayStat.confidence && showProjection && (
              <div className="text-xs text-slate-500 mt-0.5">
                {Math.round(displayStat.confidence * 100)}%
              </div>
            )}
          </div>

          {/* Interactive Buttons - Compact design */}
          <div className="flex flex-col gap-1 flex-shrink-0">
            <button
              onClick={handleMoreClick}
              className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 bg-slate-700 hover:bg-slate-600 text-white hover:scale-105 active:scale-95 min-w-[60px] justify-center"
            >
              More <ChevronUp size={12} />
            </button>
            <button
              onClick={handleLessClick}
              className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 bg-slate-700 hover:bg-slate-600 text-white hover:scale-105 active:scale-95 min-w-[60px] justify-center"
            >
              Less <ChevronDown size={12} />
            </button>
          </div>
        </div>
      </div>
    );
  }
);

PlayerStatCard.displayName = "PlayerStatCard";

export default PlayerStatCard;
