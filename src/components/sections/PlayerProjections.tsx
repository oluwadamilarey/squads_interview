"use client";

import React from "react";
import Image from "next/image";
import pickMoreOrLessImg from "../../assets/pick_more_or_less_on_stats.png";

import withdrawYourWinningsImg from "../../assets/withdraw_your_winnings.png";
import powercardImg from "../../assets/power_card.svg";
import sectionPlayersImg from "../../assets/section_players.svg";
import pickmoresectionImg from "../../assets/pick_more_section.svg";
import entry_amount from "../../assets/entry_amount.svg";
import curvy_down_string from "../../assets/curvy_down_string.svg";

export default function PlayerProjections() {
  return (
    <div className=" bg-gray-50 items-center justify-center flex flex-col relative overflow-hidden">
      <Image
        src={pickmoresectionImg}
        alt="Logo"
        className="hidden md:block"
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
