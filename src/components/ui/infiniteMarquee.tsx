import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Pause, Play, Zap, ZapOff } from "lucide-react";
import PlayerStatCard from "../card/PlayerCard";
import type { PlayerStatsData } from "../../types/playerStats";

interface InfiniteMarqueeProps {
  displayData: PlayerStatsData[];
  onMoreClick: (playerId: string, statId: string) => void;
  onLessClick: (playerId: string, statId: string) => void;
  speed?: "slow" | "normal" | "fast";
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  showControls?: boolean;
}

const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({
  displayData,
  onMoreClick,
  onLessClick,
  speed = "normal",
  direction = "left",
  pauseOnHover = true,
  showControls = true,
}) => {
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const [currentDirection, setCurrentDirection] = useState(direction);
  const [isPaused, setIsPaused] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const speedMap = {
    slow: 120,
    normal: 60,
    fast: 30,
  };

  // Force re-render when animation settings change
  useEffect(() => {
    setAnimationKey((prev) => prev + 1);
  }, [currentSpeed, currentDirection]);

  // Toggle controls
  const toggleSpeed = () => {
    const speeds: Array<"slow" | "normal" | "fast"> = [
      "slow",
      "normal",
      "fast",
    ];
    const currentIndex = speeds.indexOf(currentSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setCurrentSpeed(speeds[nextIndex]);
  };

  const toggleDirection = () => {
    setCurrentDirection((prev) => (prev === "left" ? "right" : "left"));
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  if (displayData.length === 0) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-4xl mb-4">📊</div>
        <h3 className="text-lg font-medium text-white mb-2">
          No statistics available
        </h3>
        <p className="text-slate-400">
          No player data found for the selected stat type.
        </p>
      </motion.div>
    );
  }

  // Create CSS animation styles
  const animationName = `marquee-${currentDirection}-${currentSpeed}-${animationKey}`;
  const duration = speedMap[currentSpeed];

  const keyframes =
    currentDirection === "left"
      ? `@keyframes ${animationName} { 0% { transform: translateX(0%); } 100% { transform: translateX(-100%); } }`
      : `@keyframes ${animationName} { 0% { transform: translateX(-100%); } 100% { transform: translateX(0%); } }`;

  return (
    <div className="relative w-full">
      {/* Dynamic CSS Injection */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          ${keyframes}
          
          .marquee-animate-${animationKey} {
            animation: ${animationName} ${duration}s linear infinite;
          }
          
          .marquee-paused {
            animation-play-state: paused !important;
          }
          
          .marquee-hover-pause:hover .marquee-animate-${animationKey} {
            animation-play-state: paused;
          }
        `,
        }}
      />

      {/* Controls
      {showControls && (
        <div className="flex justify-center items-center gap-3 mb-6 flex-wrap">
          <button
            onClick={togglePause}
            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
          >
            {isPaused ? <Play size={14} /> : <Pause size={14} />}
            {isPaused ? "Play" : "Pause"}
          </button>

          <button
            onClick={toggleDirection}
            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
          >
            {currentDirection === "left" ? "← Left" : "Right →"}
          </button>

          <button
            onClick={toggleSpeed}
            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
          >
            {currentSpeed === "fast" ? <Zap size={14} /> : <ZapOff size={14} />}
            Speed: {currentSpeed}
          </button>

          <div className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">
            {Math.round(speedMap[currentSpeed])}s per cycle
          </div>
        </div>
      )} */}

      {/* Marquee Container */}
      <div
        className={`
          relative overflow-hidden h-64
          ${pauseOnHover ? `marquee-hover-pause` : ""}
        `}
      >
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

        {/* First Set of Cards */}
        <div
          className={`
            flex gap-6 absolute top-0 left-0 whitespace-nowrap
            marquee-animate-${animationKey}
            ${isPaused ? "marquee-paused" : ""}
          `}
        >
          {displayData.map((playerData, index) => (
            <motion.div
              key={`set1-${playerData.groupId}`}
              className="inline-block flex-shrink-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.1,
                duration: 0.3,
                type: "spring",
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <PlayerStatCard
                playerData={playerData}
                onMoreClick={onMoreClick}
                onLessClick={onLessClick}
                showProjection={true}
              />
            </motion.div>
          ))}
        </div>

        {/* Second Set of Cards (for seamless loop) */}
        <div
          className={`
            flex gap-6 absolute top-0 left-full whitespace-nowrap
            marquee-animate-${animationKey}
            ${isPaused ? "marquee-paused" : ""}
          `}
        >
          {displayData.map((playerData, index) => (
            <motion.div
              key={`set2-${playerData.groupId}`}
              className="inline-block flex-shrink-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: (index + displayData.length) * 0.1,
                duration: 0.3,
                type: "spring",
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <PlayerStatCard
                playerData={playerData}
                onMoreClick={onMoreClick}
                onLessClick={onLessClick}
                showProjection={true}
              />
            </motion.div>
          ))}
        </div>

        {/* Status Indicator */}
        {/* <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isPaused ? "bg-red-500" : "bg-green-500 animate-pulse"
              }`}
            />
            <span>
              {isPaused
                ? "Paused"
                : `${currentDirection === "left" ? "←" : "→"} ${currentSpeed}`}
            </span>
          </div>
        </div> */}
      </div>

      {/* Info Bar */}
      {/* <div className="mt-4 bg-slate-800 rounded-lg p-3">
        <div className="flex items-center justify-between text-sm">
          <div className="text-slate-400">
            Marquee: {displayData.length} players • {currentDirection} direction
            • {currentSpeed} speed
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            {pauseOnHover && <span className="text-xs">Hover to pause</span>}
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default InfiniteMarquee;
