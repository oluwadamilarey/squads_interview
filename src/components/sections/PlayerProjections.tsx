"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import pickMoreOrLessImg from "../../assets/pick_more_or_less_on_stats.png";

import withdrawYourWinningsImg from "../../assets/withdraw_your_winnings.png";
import powercardImg from "../../assets/power_card.svg";
import sectionPlayersImg from "../../assets/section_players.svg";
import pickmoresectionImg from "../../assets/pick_more_section.svg";
import entry_amount from "../../assets/entry_amount.svg";
import curvy_down_string from "../../assets/curvy_down_string.svg";

// Types and Interfaces
interface Player {
  id: string;
  name: string;
  avatar: string;
  category: string;
  odds: number;
  isActive: boolean;
  stats?: {
    winRate: number;
    totalGames: number;
  };
}

interface BettingState {
  selectedPlayers: string[];
  entryAmount: number;
  potentialPayout: number;
  multiplier: number;
}

interface PredictionGameProps {
  players: Player[];
  maxSelections?: number;
  minEntryAmount?: number;
  maxEntryAmount?: number;
  baseMultiplier?: number;
  onSubmitPrediction?: (state: BettingState) => void;
  className?: string;
}

// Game Icons Component
const GameIcons = () => {
  const icons = [
    { emoji: "🎮", bg: "bg-purple-300", label: "Gaming" },
    { emoji: "🎯", bg: "bg-cyan-300", label: "Skills" },
    { emoji: "🎲", bg: "bg-green-400", label: "Luck" },
    { emoji: "💰", bg: "bg-yellow-400", label: "Money" },
  ];

  return (
    <div className="flex gap-2 justify-center mb-4">
      {icons.map((icon, index) => (
        <motion.div
          key={icon.label}
          className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center text-xl",
            icon.bg
          )}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: index * 0.1,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          {icon.emoji}
        </motion.div>
      ))}
    </div>
  );
};

// Player Card Component
function PlayerCard() {
  return (
    <div className="flex justify-between items-center bg-[#1e293b] text-white p-4 rounded-2xl w-full max-w-md shadow-lg">
      {/* Left Side: Image and Info */}
      <div className="flex items-center space-x-4">
        <img
          src="/haaland.jpg"
          alt="Erling Haaland"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="text-sm">
          <h3 className="font-semibold text-white">Erling Haaland</h3>
          <p className="text-gray-400 text-xs">Manchester City · Forward</p>
          <p className="text-gray-300 text-xs mt-1">
            vs. Arsenal on
            <br />
            3rd Mar 11:20 PM
          </p>
        </div>
      </div>

      {/* Right Side: Stat + Buttons */}
      <div className="flex flex-col items-end justify-between h-full space-y-2">
        <div className="text-center">
          <p className="text-lg font-semibold">2.5</p>
          <p className="text-xs text-gray-400">
            Shots on
            <br />
            Target
          </p>
        </div>
        <div className="flex flex-col space-y-1">
          <button className="bg-lime-300 text-black text-sm font-semibold px-3 py-1 rounded-md shadow-sm">
            More ↑
          </button>
          <button className="bg-gray-800 text-white text-sm font-semibold px-3 py-1 rounded-md shadow-sm">
            Less ↓
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Component
export default function PlayerProjections({
  players,
  maxSelections = 8,
  className,
}: PredictionGameProps) {
  const playerData = [
    {
      name: "Erling Haaland",
      rating: "91 Rating",
      odds: "2.5",
      avatar: "/api/placeholder/40/40",
    },
    {
      name: "Andrea Onana",
      rating: "84 Rating",
      odds: "3.5",
      avatar: "/api/placeholder/40/40",
    },
    {
      name: "Cole Palmer",
      rating: "84 Rating",
      odds: "45.5",
      avatar: "/api/placeholder/40/40",
    },
  ];
  return (
    <div className=" bg-gray-50 items-center justify-center flex flex-col relative overflow-hidden">
      {/* Header Card - Main CTA */}

      {/* Stats Display */}

      {/* Background decorative elements */}
      {/* <div className="absolute top-20 right-20 w-4 h-4 bg-yellow-400 rounded-full opacity-20"></div>
      <div className="absolute bottom-40 left-20 w-6 h-6 bg-purple-400 rounded-full opacity-20"></div>
      <div className="absolute top-1/2 left-10 w-2 h-2 bg-green-400 rounded-full opacity-30"></div> */}
      <Image
        src={pickmoresectionImg}
        alt="Logo"
        className="hidden md:block" // Hidden on mobile, visible on md screens and up
        priority
      />

      <div className="md:hidden flex flex-col items-center justify-center w-full max-w-4xl p-6 space-y-8">
        <Image src={pickMoreOrLessImg} alt="logo" width={250} height={250} />
        <Image src={sectionPlayersImg} alt="logo" />
        <Image src={entry_amount} alt="logo" />
        <Image src={curvy_down_string} alt="logo" />
        <Image
          src={withdrawYourWinningsImg}
          alt="logo"
          width={250}
          height={250}
        />
        <Image src={powercardImg} alt="logo" />
      </div>
    </div>
  );
}
