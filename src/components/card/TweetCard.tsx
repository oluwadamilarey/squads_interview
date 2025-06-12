"use client";

import React from "react";

const TweetCard = () => {
  return (
    <>
      <div className="bg-[#0f1722] p-4 rounded-lg text-white min-w-[320px] max-w-[320px] h-auto mx-2 flex-shrink-0">
        <p className="text-base leading-tight mb-4">
          Broooo i just noticed
          <br />
          squads used the picture
          <br />
          of GOAT for Lionel
          <br />
          Messi in their platform
          <br />
          and it&apos;s bursting my
          <br />
          brain 😂
        </p>
        <p className="text-green-400 font-medium mb-4 text-base">#Squadgame</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-xs">👤</span>
            </div>
            <span className="text-gray-300 text-sm">@UTDTrey</span>
          </div>

          <div className="bg-green-500 px-2 py-1 rounded text-xs font-bold text-black">
            Squads
          </div>
        </div>
      </div>
    </>
  );
};

export default TweetCard;
