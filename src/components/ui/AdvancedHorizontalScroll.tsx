// components/AdvancedHorizontalScroll.tsx - Enhanced Scroll with More Effects
import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Grip } from "lucide-react";
import PlayerStatCard from "../card/PlayerCard";
import type { PlayerStatsData } from "../../types/playerStats";

interface AdvancedHorizontalScrollProps {
  displayData: PlayerStatsData[];
  onMoreClick: (playerId: string, statId: string) => void;
  onLessClick: (playerId: string, statId: string) => void;
  autoScroll?: boolean;
  scrollSpeed?: number;
}

const AdvancedHorizontalScroll: React.FC<AdvancedHorizontalScrollProps> = ({
  displayData,
  onMoreClick,
  onLessClick,
  autoScroll = false,
  scrollSpeed = 30000,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Motion values for smooth animations
  const x = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 300, damping: 30 });

  // Framer Motion scroll progress
  const { scrollXProgress } = useScroll({ container: scrollRef });

  // Transform scroll progress for various effects
  const gradientOpacity = useTransform(
    scrollXProgress,
    [0, 0.05, 0.95, 1],
    [0, 1, 1, 0]
  );
  const indicatorScale = useTransform(scrollXProgress, [0, 1], [1, 1.2]);

  // Auto-scroll effect
  useEffect(() => {
    if (!autoScroll || isHovered || isDragging) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;

        if (scrollLeft >= maxScroll) {
          // Reset to beginning
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Continue scrolling
          scrollRef.current.scrollBy({ left: 2, behavior: "auto" });
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, [autoScroll, isHovered, isDragging]);

  // Check scroll position
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

  // Smooth scroll functions with momentum
  const scrollLeft = () => {
    if (scrollRef.current) {
      const cardWidth = 320 + 24;
      const scrollAmount = cardWidth * 3;
      scrollRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const cardWidth = 320 + 24;
      const scrollAmount = cardWidth * 3;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Scroll to specific card
  const scrollToCard = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = 320 + 24;
      const scrollPosition = index * cardWidth;
      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
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
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 3, repeat: Infinity }}
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
      {/* Header with controls */}
      <div className="flex justify-between items-center mb-6">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Grip className="text-slate-400" size={20} />
          <span className="text-slate-400 text-sm">
            Swipe or use arrows to navigate
          </span>
        </motion.div>

        {/* Dot navigation for larger screens */}
        <div className="hidden md:flex gap-2">
          {Array.from({ length: Math.ceil(displayData.length / 3) }).map(
            (_, index) => (
              <motion.button
                key={index}
                onClick={() => scrollToCard(index * 3)}
                className="w-2 h-2 rounded-full bg-slate-600 hover:bg-blue-500 transition-colors"
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.8 }}
              />
            )
          )}
        </div>
      </div>

      {/* Navigation Arrows */}
      <AnimatePresence>
        {canScrollLeft && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/80 backdrop-blur-sm hover:bg-black/90 text-white p-3 rounded-full shadow-2xl border border-slate-600 transition-all"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {canScrollRight && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/80 backdrop-blur-sm hover:bg-black/90 text-white p-3 rounded-full shadow-2xl border border-slate-600 transition-all"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Scroll Container */}
      <motion.div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-6 px-16 snap-x snap-mandatory"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
      >
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {displayData.map((playerData, index) => (
          <motion.div
            key={playerData.groupId}
            initial={{ opacity: 0, x: 100, rotateY: 15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              type: "spring",
              stiffness: 100,
            }}
            whileHover={{
              scale: 1.05,
              rotateY: -5,
              z: 50,
              transition: { duration: 0.3 },
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.5 },
            }}
            viewport={{ once: false, margin: "-50px" }}
            className="flex-shrink-0 snap-start"
            style={{ perspective: 1000 }}
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

      {/* Left and Right Gradient Overlays */}
      <motion.div
        className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-black via-black/50 to-transparent pointer-events-none z-10"
        style={{ opacity: gradientOpacity }}
      />
      <motion.div
        className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-black via-black/50 to-transparent pointer-events-none z-10"
        style={{ opacity: gradientOpacity }}
      />

      {/* Enhanced Scroll Indicator */}
      <div className="mt-6 flex flex-col items-center gap-2">
        <motion.div
          className="w-32 h-1 bg-slate-800 rounded-full overflow-hidden relative"
          style={{ scale: indicatorScale }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full origin-left relative"
            style={{ scaleX: scrollXProgress }}
          >
            <motion.div
              className="absolute right-0 top-0 w-2 h-full bg-white rounded-full shadow-lg"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="text-xs text-slate-500"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {Math.round(scrollXProgress.get() * 100)}% scrolled
        </motion.div>
      </div>

      {/* Auto-scroll indicator */}
      {autoScroll && (
        <motion.div
          className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full"
          animate={{ opacity: isHovered ? 0.5 : 1 }}
        >
          Auto-scroll {isHovered ? "paused" : "active"}
        </motion.div>
      )}
    </div>
  );
};

export default AdvancedHorizontalScroll;
