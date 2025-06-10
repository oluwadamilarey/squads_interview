"use client";

import React from "react";
import { motion } from "framer-motion";

const FloatingElement = ({
  children,
  delay = 0,
  amplitude = 20,
  duration = 4,
  className = "",
}: any) => (
  <motion.div
    animate={{
      y: [-amplitude, amplitude, -amplitude],
      rotate: [-5, 5, -5],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
    className={`absolute ${className}`}
  >
    {children}
  </motion.div>
);

const Star = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
  </svg>
);

const Sparkle = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

const Hero = () => {
  return (
    <div className="relative min-h-screen  from-slate-900  overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-8">
          <div className="text-white font-medium">Home</div>
          <div className="text-gray-400 font-medium">Partners</div>
          <div className="text-gray-400 font-medium">How to play</div>
          <div className="text-gray-400 font-medium">FAQs</div>
        </div>

        <div className="flex items-center">
          <div className="bg-green-500 text-black px-4 py-2 rounded-full font-bold text-sm">
            Squads
          </div>
          <div className="bg-white text-black px-2 py-1 rounded-full text-xs font-bold ml-2">
            BETA
          </div>
        </div>

        <div className="flex items-center space-x-4 text-white">
          <div className="w-5 h-5">📱</div>
          <div className="w-5 h-5">🎵</div>
          <div className="w-5 h-5">📺</div>
          <div className="w-5 h-5">📷</div>
        </div>
      </nav>

      {/* Floating Background Elements */}
      <FloatingElement
        delay={0}
        amplitude={15}
        duration={6}
        className="top-20 left-10"
      >
        <svg
          width="65"
          height="37"
          viewBox="0 0 65 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.9991 8.06362C7.28782 3.2175 17.1359 0.084672 24.7229 4.77486C28.194 6.92065 31.0307 8.59164 31.5902 12.6488C32.2147 17.1777 30.2779 21.9265 25.7984 22.8909C23.6495 23.3536 21.4544 22.8374 20.0726 20.6568C19.2099 19.2954 19.7638 16.0598 21.2197 13.8777C22.6756 11.6956 28.4961 7.93679 33.8105 9.1042C40.0368 10.4719 47.3457 17.4017 47.5864 24.4776C47.7686 29.8358 44.3273 35.8121 39.6836 34.6665C34.4092 33.3654 36.8704 24.7003 37.529 22.9275C38.1876 21.1547 40.6837 16.828 43.8425 14.6093C47.0013 12.3906 51.0826 13.0235 52.7884 13.5356C54.4942 14.0478 58.8049 16.1369 62.1962 21.9999"
            stroke="#88C80C"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </FloatingElement>

      <FloatingElement
        delay={1}
        amplitude={25}
        duration={5}
        className="top-32 right-20"
      >
        <Sparkle size={20} className="text-cyan-400" />
      </FloatingElement>

      <FloatingElement
        delay={2}
        amplitude={20}
        duration={7}
        className="bottom-40 left-16"
      >
        <div className="w-8 h-8 bg-orange-400 rounded-full"></div>
      </FloatingElement>

      <FloatingElement
        delay={0.5}
        amplitude={18}
        duration={4.5}
        className="bottom-60 right-32"
      >
        <Star size={18} className="text-yellow-400" />
      </FloatingElement>

      {/* Additional decorative elements */}
      <FloatingElement
        delay={3}
        amplitude={12}
        duration={8}
        className="top-1/3 left-1/4"
      >
        <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
      </FloatingElement>

      <FloatingElement
        delay={1.5}
        amplitude={22}
        duration={6}
        className="top-1/2 right-1/4"
      >
        <Sparkle size={16} className="text-green-400" />
      </FloatingElement>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[80vh] px-6">
        <div className="text-center max-w-4xl">
          {/* Slanted Speech Bubbles */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 100,
            }}
            className="relative mb-6"
          >
            {/* First bubble - "The New way to" */}
            <motion.div
              whileHover={{
                scale: 1.05,
                rotate: -1,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="inline-block bg-green-400 text-black px-8 py-4 rounded-[2rem] transform -rotate-2 shadow-2xl mb-4 mr-4"
            >
              <span className="text-4xl md:text-6xl font-bold">
                The New way to
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50, rotate: 3 }}
            animate={{ opacity: 1, y: 0, rotate: 2 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 100,
            }}
            className="relative mb-12"
          >
            {/* Second bubble - "Win Money on Sports" */}
            <motion.div
              whileHover={{
                scale: 1.05,
                rotate: 1,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="inline-block bg-gradient-to-r from-pink-400 to-purple-400 text-black px-8 py-4 rounded-[2rem] transform rotate-2 shadow-2xl"
            >
              <span className="text-4xl md:text-6xl font-bold">
                Win Money on Sports
              </span>
            </motion.div>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white text-xl md:text-2xl mb-8 font-medium"
          >
            Just pick <span className="font-bold">More</span> or{" "}
            <span className="font-bold">Less</span> on player stats and
            <br />
            win up to <span className="text-green-400 font-bold">
              100X
            </span>{" "}
            your cash!
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              whileHover={{
                scale: 1.1,
                rotate: 1,
                transition: { type: "spring", stiffness: 300 },
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-400 text-black px-8 py-4 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transform transition-all duration-200"
            >
              Wanna play? Tap in 🚀
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/3 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/3 w-24 h-24 border border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
      </div>
    </div>
  );
};

export default Hero;
