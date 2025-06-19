// components/HorizontalPlayerStats.tsx - Framer Motion Horizontal Scroll
import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PlayerStatCard from "../card/PlayerCard";
import type { PlayerStatsData } from "../../types/playerStats";

interface HorizontalPlayerStatsProps {
  displayData: PlayerStatsData[];
  onMoreClick: (playerId: string, statId: string) => void;
  onLessClick: (playerId: string, statId: string) => void;
}

const HorizontalPlayerStats: React.FC<HorizontalPlayerStatsProps> = ({
  displayData,
  onMoreClick,
  onLessClick,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  // Framer Motion scroll progress
  const { scrollXProgress } = useScroll({ container: scrollRef });

  // Transform scroll progress to gradient opacity
  const gradientOpacity = useTransform(
    scrollXProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0]
  );

  // Check scroll position to show/hide navigation arrows
  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollPosition);
      return () =>
        scrollContainer.removeEventListener("scroll", checkScrollPosition);
    }
  }, [displayData]);

  // Smooth scroll functions
  const scrollLeft = () => {
    if (scrollRef.current) {
      const cardWidth = 320 + 24; // Card width + gap
      const scrollAmount = cardWidth * 2; // Scroll 2 cards at a time
      scrollRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const cardWidth = 320 + 24; // Card width + gap
      const scrollAmount = cardWidth * 2; // Scroll 2 cards at a time
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Drag constraints
  const dragConstraints = {
    left: -(displayData.length * 344 - (scrollRef.current?.clientWidth || 0)),
    right: 0,
  };

  if (displayData.length === 0) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-4xl mb-4"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          📊
        </motion.div>
        <h3 className="text-lg font-medium text-white mb-2">
          No statistics available
        </h3>
        <p className="text-slate-400">
          No player data found for the selected stat type.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="relative">
      {/* Left Navigation Arrow */}
      <AnimatePresence>
        {canScrollLeft && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-slate-800 hover:bg-slate-700 text-white p-3 rounded-full shadow-lg border border-slate-600 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Right Navigation Arrow */}
      <AnimatePresence>
        {canScrollRight && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-slate-800 hover:bg-slate-700 text-white p-3 rounded-full shadow-lg border border-slate-600 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Horizontal Scroll Container */}
      <motion.div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-12"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
      >
        {displayData.map((playerData, index) => (
          <motion.div
            key={playerData.groupId}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              type: "spring",
              stiffness: 100,
            }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            className="flex-shrink-0"
          >
            <PlayerStatCard
              playerData={playerData}
              onMoreClick={onMoreClick}
              onLessClick={onLessClick}
              showProjection={true}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Left Gradient Fade */}
      <motion.div
        className="absolute left-0 top-0 w-12 h-full bg-gradient-to-r from-black to-transparent pointer-events-none z-5"
        style={{ opacity: gradientOpacity }}
      />

      {/* Right Gradient Fade */}
      <motion.div
        className="absolute right-0 top-0 w-12 h-full bg-gradient-to-l from-black to-transparent pointer-events-none z-5"
        style={{ opacity: gradientOpacity }}
      />

      {/* Scroll Indicator */}
      <div className="mt-4 flex justify-center">
        <motion.div className="w-24 h-1 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-500 rounded-full origin-left"
            style={{ scaleX: scrollXProgress }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HorizontalPlayerStats;
