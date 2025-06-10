import React from "react";
import Image from "next/image";

const PlayerCard = ({
  playerName = "Erling Halland",
  team = "Manchester City",
  position = "Forward",
  opponent = "Arsenal",
  matchDate = "3rd Mar 11:20 PM",
  statValue = "2.5",
  statType = "Shots on Target",
  playerImage = "/haaland.jpg", 
}) => {
  return (
    <div className="bg-[#3a4956] rounded-xl p-4 flex items-center justify-between text-white max-w-md">
      {/* Left section with player info */}
      <div className="flex items-center space-x-5">
        {/* Player image */}
        <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={playerImage}
            alt={playerName}
            width={56}
            height={56}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Player details */}
        <div className="flex-1 ">
          <h3 className="text-lg font-bold text-white mb-1">{playerName}</h3>
          <p className="text-gray-300 text-sm mb-1">
            {team} - {position}
          </p>
          <p className="text-gray-400 text-sm">vs. {opponent} on</p>
          <p className="text-gray-400 text-sm">{matchDate}</p>
        </div>
      </div>

      {/* Right section with stats and buttons */}
      <div className="flex items-center space-x-3">
        {/* Stat value */}
        <div className="bg-[#2a3441] rounded-lg px-2 py-1 text-center min-w-[40px]">
          <div className="text-l font-bold text-white">{statValue}</div>
          <div className="text-xs text-gray-400 leading-tight">{statType}</div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col space-y-2">
          <button className="bg-[#2a3441] hover:bg-[#1f2937] rounded-lg px-4 py-2 text-sm font-medium text-white flex items-center space-x-2 transition-colors">
            <span>More</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>

          <button className="bg-[#2a3441] hover:bg-[#1f2937] rounded-lg px-4 py-2 text-sm font-medium text-white flex items-center space-x-2 transition-colors">
            <span>Less</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
