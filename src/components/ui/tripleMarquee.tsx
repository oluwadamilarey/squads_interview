// components/TripleMarquee.tsx - Three-Row Infinite Scroll
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Pause, Play, Info } from "lucide-react";
import PlayerStatCard from "../card/PlayerCard";
import type { PlayerStatsData } from "../../types/playerStats";

interface TripleMarqueeProps {
  displayData: PlayerStatsData[];
  onMoreClick: (playerId: string, statId: string) => void;
  onLessClick: (playerId: string, statId: string) => void;
  showControls?: boolean;
}

interface MarqueeRowProps {
  data: PlayerStatsData[];
  direction: "left" | "right";
  speed: number; // duration in seconds
  rowIndex: number;
  onMoreClick?: (playerId: string, statId: string) => void;
  onLessClick?: (playerId: string, statId: string) => void;
  isPaused: boolean;
}

// Individual Marquee Row Component
const MarqueeRow = ({
  data,
  direction,
  speed,
  rowIndex,
  isPaused,
}: MarqueeRowProps) => {
  const [isRowHovered, setIsRowHovered] = useState(false);

  const animationName = `marquee-row-${rowIndex}-${direction}-${speed}`;

  // Get actual card dimensions from PlayerStatCard
  const cardWidth = 400; // Match your actual card width
  const cardGap = 32; // Consistent gap between cards
  const totalCardWidth = cardWidth + cardGap; // 432px per card unit
  const setWidth = data.length * totalCardWidth; // Total width of one complete set

  const keyframes =
    direction === "left"
      ? `@keyframes ${animationName} {
         0% { transform: translateX(0px); }
         100% { transform: translateX(-${setWidth}px); }
       }`
      : `@keyframes ${animationName} {
         0% { transform: translateX(-${setWidth}px); }
         100% { transform: translateX(0px); }
       }`;

  if (data.length === 0) {
    return <></>;
  }

  const marqueeStyles = `
  ${keyframes}
  
  .row-${rowIndex}-animate {
    animation: ${animationName} ${speed}s linear infinite;
  }
  
  .row-${rowIndex}-paused {
    animation-play-state: paused !important;
  }
  
  .row-${rowIndex}-hover-pause:hover .row-${rowIndex}-animate {
    animation-play-state: paused;
  }
`;

  return (
    <div className="relative mb-3">
      {/* Added bottom margin for row spacing */}
      <style>{marqueeStyles}</style>
      <div
        className={`relative overflow-hidden h-33 bg-slate-900/30 row-${rowIndex}-hover-pause`}
        onMouseEnter={() => setIsRowHovered(true)}
        onMouseLeave={() => setIsRowHovered(false)}
        style={{
          isolation: "isolate",
          contain: "layout style paint",
        }}
      >
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-black via-black/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-black via-black/90 to-transparent z-10 pointer-events-none" />

        {/* First Set of Cards */}
        <div
          className={`absolute top-4 left-0 whitespace-nowrap
            row-${rowIndex}-animate 
            ${isPaused ? `row-${rowIndex}-paused` : ""}
         `}
          style={{
            display: "flex",
            gap: "32px",
            height: "fit-content",
          }}
        >
          {data.map((playerData, index) => (
            <div
              key={`row${rowIndex}-set1-${playerData.groupId}`}
              className="flex-shrink-0"
              style={{
                width: `${cardWidth}px`,
                height: "auto",
              }}
            >
              <PlayerStatCard playerData={playerData} />
            </div>
          ))}
        </div>

        {/* Second Set of Cards (Duplicate for seamless loop) */}
        <div
          className={`absolute top-4 whitespace-nowrap
            row-${rowIndex}-animate
            ${isPaused ? `row-${rowIndex}-paused` : ""}
          `}
          style={{
            display: "flex",
            gap: "32px",
            left: `${setWidth}px`, // Position right after first set
            height: "fit-content",
          }}
        >
          {data.map((playerData, index) => (
            <div
              key={`row${rowIndex}-set2-${playerData.groupId}`}
              className="flex-shrink-0"
              style={{
                width: `${cardWidth}px`,
                height: "auto",
              }}
            >
              <PlayerStatCard playerData={playerData} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main TripleMarquee Component
const TripleMarquee: React.FC<TripleMarqueeProps> = ({
  displayData,
  onMoreClick,
  onLessClick,
  showControls = true,
}) => {
  const [globalPause, setGlobalPause] = useState(false);

  const total = displayData.length;
  const fourth = Math.ceil(total / 4);

  const row1Data = displayData.slice(0, fourth);
  const row2Data = displayData.slice(fourth, fourth * 2);
  const row3Data = displayData.slice(fourth * 2, fourth * 3);
  const row4Data = displayData.slice(fourth * 3);

  const rowConfigs = [
    { data: row1Data, direction: "left", speed: 60, label: "Top Row" },
    { data: row2Data, direction: "right", speed: 45, label: "Second Row" },
    { data: row3Data, direction: "left", speed: 75, label: "Third Row" },
    { data: row4Data, direction: "right", speed: 50, label: "Bottom Row" },
  ];

  const totalCards = displayData.length;
  const hasData = totalCards > 0;

  if (!hasData) {
    return (
      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-4xl mb-4">📊</div>
        <h3 className="text-lg font-medium text-white mb-2">
          No statistics available
        </h3>
        <p className="text-slate-400">
          No player data found for the triple marquee display.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Three Marquee Rows */}
      <div className="space-y-4 mb-8">
        {rowConfigs.map((config, index) => (
          <div key={index}>
            <MarqueeRow
              key={index}
              data={config.data}
              direction={config.direction as "left" | "right"}
              speed={config.speed}
              rowIndex={index}
              isPaused={globalPause}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripleMarquee;
