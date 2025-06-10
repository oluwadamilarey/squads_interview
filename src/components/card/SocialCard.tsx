"use client";

import React from "react";
import Image from "next/image";

import haaland from "../../assets/haaland.svg";
import squads from "../../assets/squads.svg";

const Card = ({ overlay = "bg-black/40", aspectRatio = "aspect-[9/12]" }) => {
  return (
    <>
      <div className="bg-[#262F3B] px-4 pt-4 pb-4 rounded-xl min-w-[320px] max-w-[320px] h-auto mx-2 flex-shrink-0">
        <div className="relative my-2">
          {/* Placeholder for Haaland image */}
          <Image
            src={haaland}
            alt="Haaland meme"
            width={512}
            height={512}
            className=""
          />

          {/* Headline Text - Fixed positioning and sizing */}
          <div className="text-white font-bold text-base leading-tight mb-4">
            Stay humble haaland
            <br />
            after 0:4 defeat against
            <br />
            spurs 😭 <span className="text-green-400">#MCITOT</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-gray-300">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-xs">👤</span>
            </div>
            <p className="text-sm">@UTDTrey</p>
          </div>

          <div className="bg-green-500 px-2 py-1 rounded text-xs font-bold text-black">
            Squads
          </div>
        </div>
      </div>
    </>
  );
};

export const TweetCard = () => {
  <div className="bg-[#b4bdc9] p-6 rounded-lg text-white">
    <p className="text-lg leading-relaxed mb-4">
      Broooo i just noticed squads used the picture of GOAT for Lionel Messi in
      their platform and it's bursting my brain 😂
    </p>
    <p className="text-green-400 font-medium mb-4">#Squadgame</p>

    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
          <span className="text-xs">👤</span>
        </div>
        <span className="text-gray-300 text-sm">@UTDTrey</span>
      </div>

      <div className="bg-green-500 px-3 py-1 rounded text-xs font-bold text-black">
        Squads
      </div>
    </div>
  </div>;
};

export default Card;
