"use client";

import ScrollReveal from "@/components/motion/ScrollReveal";
// import { squads } from "@/data/mockData";
import Image from "next/image";
import numerous_player_projections from "../../assets/numerous_player_projections.svg";
import why_the_street from "../../assets/why_the_streets.svg";
import instant_cashout from "../../assets/instant_cashout.svg";
import numerous_options from "../../assets/numerous_options.svg";
import fast_payout from "../../assets/fast_payouts.svg";
import fast_rewards from "../../assets/fast_deposit.svg";
import word_on_the_street from "../../assets/word_on_the_street.svg";
import SocialCard from "../card/SocialCard";
import TweetCard from "../card/TweetCard";
import PlayerCard from "../card/PlayerCard";
import { useGetPlayerShotsOnTargetQuery } from "@/services/api";
import { useMemo } from "react";
import { useFilters } from "@/hooks/redux";
import { usePlayerGoals } from "@/hooks/usePlayerStats";
import SimplePlayerStatsLoader from "../ui/simplePlayerStatsDisplay";

export function SquadsSection() {
  const { data, isLoading, error, refetch } = usePlayerGoals();

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <h2 className="text-4xl font-bold text-center mb-1">
            <Image src={numerous_player_projections} alt="logo" />
          </h2>
          <p
            className="text-xl items-start"
            style={{ fontFamily: "Eudoxus Sans, Inter, system-ui, sans-serif" }}
          >
            Available player stats categories for you to pick from:
          </p>
          <p
            className="text-xl mb-16 items-start"
            style={{ fontFamily: "Eudoxus Sans, Inter, system-ui, sans-serif" }}
          >
            Shots, goals, assists, saves, passes, and more.
          </p>
        </ScrollReveal>

        <SimplePlayerStatsLoader statType="GOALS" />

        <ScrollReveal className="flex flex-col items-center justify-center mt-16 text-center">
          <h2 className="text-4xl font-bold text-center mb-1">
            <Image src={why_the_street} alt="logo" />
          </h2>
          <p
            className="text-xl text-center"
            style={{ fontFamily: "Eudoxus Sans, Inter, system-ui, sans-serif" }}
          >
            Available player stats categories for you to pick from:
          </p>
          <p
            className="text-xl mb-16 text-center"
            style={{ fontFamily: "Eudoxus Sans, Inter, system-ui, sans-serif" }}
          >
            Shots, goals, assists, saves, passes, and more.
          </p>
        </ScrollReveal>

        <div className="flex justify-center mt-8">
          <Image src={instant_cashout} alt="logo" />
          <Image src={numerous_options} alt="logo" />
          <Image src={fast_payout} alt="logo" />
          <Image src={fast_rewards} alt="logo" />
        </div>
      </div>
      <ScrollReveal className="flex flex-col items-center justify-center mt-16 text-center">
        <h2 className="text-4xl font-bold text-center mb-1">
          <Image src={word_on_the_street} alt="logo" />
        </h2>
      </ScrollReveal>

      <div className="overflow-hidden py-8 w-full">
        {/* First row - scrolling right */}
        <div className="flex animate-scroll-right mb-8 w-max">
          <SocialCard />
          <TweetCard />
          <SocialCard />
          <TweetCard />
          <SocialCard />
          <TweetCard />
          <SocialCard />
          <TweetCard />
        </div>

        {/* Second row - scrolling left */}
        <div className="flex animate-scroll-left w-max">
          <SocialCard />
          <TweetCard />
          <SocialCard />
          <TweetCard />
          <SocialCard />
          <TweetCard />
          <SocialCard />
          <TweetCard />
        </div>

        <style jsx>{`
          @keyframes scroll-right {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100vw);
            }
          }

          @keyframes scroll-left {
            0% {
              transform: translateX(100vw);
            }
            100% {
              transform: translateX(-100%);
            }
          }

          .animate-scroll-right {
            animation: scroll-right 30s linear infinite;
          }

          .animate-scroll-left {
            animation: scroll-left 30s linear infinite;
          }
        `}</style>
      </div>
    </section>
  );
}
