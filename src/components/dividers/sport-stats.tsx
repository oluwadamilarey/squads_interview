"use client";

import React, { useState } from "react";
import boots from "../../assets/boots.svg";
import fireball from "../../assets/fireball.svg";
import handgloves from "../../assets/hand-gloves.svg";
import training from "../../assets/training.svg";
import Image from "next/image";

export interface StatItem {
  label: string;
  value: number;
  icon: string;
}

export interface SportsStatsBarProps {
  stats: StatItem[];
  className?: string;
  autoScroll?: boolean;
  scrollSpeed?: number;
  pauseOnHover?: boolean;
}

const SportsStatsBar: React.FC<SportsStatsBarProps> = ({
  stats,
  className = "",
  autoScroll = true,
  scrollSpeed = 20,
  pauseOnHover = true,
}) => {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate stats for seamless loop
  const duplicatedStats = [...stats, ...stats];

  const handleMouseEnter = () => {
    if (pauseOnHover) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsPaused(false);
  };

  return (
    <div
      className={`bg-gradient-to-r from-green-600 to-green-700 py-3 overflow-hidden ${className}`}
    >
      <div
        className={`flex items-center gap-6 ${
          autoScroll ? "animate-scroll" : ""
        } ${isPaused ? "pause-animation" : ""}`}
        style={
          {
            "--scroll-duration": `${scrollSpeed}s`,
            animationDuration: `${scrollSpeed}s`,
          } as React.CSSProperties
        }
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {duplicatedStats.map((stat, index) => (
          <StatDisplay key={`${stat.label}-${index}`} stat={stat} />
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll var(--scroll-duration, 20s) linear infinite;
          width: max-content;
        }

        .pause-animation {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

interface StatDisplayProps {
  stat: StatItem;
}

const StatDisplay: React.FC<StatDisplayProps> = ({ stat }) => {
  return (
    <div
      className="flex items-center gap-3 min-w-0 flex-shrink-0 
                    hover:bg-green-500 hover:bg-opacity-30 
                    hover:shadow-md hover:-translate-y-0.5
                    px-4 py-2 rounded-md transition-all duration-300 ease-out
                    cursor-pointer group transform whitespace-nowrap"
    >
      <span
        className="text-xl group-hover:scale-125 group-hover:rotate-12 
                       transition-all duration-300 ease-out"
      >
        <Image src={stat.icon} alt="logo" />
      </span>
      <div className="flex items-center gap-2">
        <span
          className="text-white font-bold text-sm
                         uppercase"
        >
          {stat.label}
        </span>
        {/* <span className="">{stat.value}</span> */}
      </div>
    </div>
  );
};

const SportsStatsBarTailwind: React.FC<SportsStatsBarProps> = ({
  stats,
  className = "",
  autoScroll = true,
  scrollSpeed = 20,
  pauseOnHover = true,
}) => {
  const [isPaused, setIsPaused] = useState(false);

  // Create enough duplicates for smooth infinite scroll
  const extendedStats = Array(4).fill(stats).flat();

  const handleMouseEnter = () => {
    if (isPaused) return;
    if (pauseOnHover) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsPaused(false);
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-25%); }
          }
          .animate-marquee {
            animation: marquee ${scrollSpeed}s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: ${pauseOnHover ? "paused" : "running"};
          }
        `,
        }}
      />

      <div
        className={`bg-gradient-to-r from-green-600 to-green-700 py-3 overflow-hidden ${className}`}
      >
        <div
          className={`flex items-center gap-6 w-max ${
            autoScroll ? "animate-marquee" : ""
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {extendedStats.map((stat, index) => (
            <StatDisplay key={`${stat.label}-${index}`} stat={stat} />
          ))}
        </div>
      </div>
    </>
  );
};

// Example usage component
const SportsStatsExample: React.FC = () => {
  const sampleStats: StatItem[] = [
    { label: "DRIBBLE", value: 12, icon: training },
    { label: "SHOTS", value: 8, icon: fireball },
    { label: "GOALIE-SAVES", value: 5, icon: handgloves },
    { label: "TACKLES", value: 15, icon: boots },
  ];

  return (
    <div className="w-full space-y-4">
      <div>
        <SportsStatsBar
          stats={sampleStats}
          className="rounded-lg shadow-lg"
          autoScroll={true}
          scrollSpeed={20}
          pauseOnHover={true}
        />
      </div>
    </div>
  );
};

export default SportsStatsBar;
export { SportsStatsBarTailwind, SportsStatsExample };
