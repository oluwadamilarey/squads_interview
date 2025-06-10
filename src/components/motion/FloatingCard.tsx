'use client'

import { motion } from 'framer-motion'

interface FloatingCardProps {
  children: React.ReactNode
  delay?: number
  amplitude?: number
  duration?: number
}

export default function FloatingCard({ 
  children, 
  delay = 0, 
  amplitude = 20, 
  duration = 4 
}: FloatingCardProps) {
  return (
    <motion.div
      animate={{
        y: [-amplitude, amplitude, -amplitude],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
    >
      {children}
    </motion.div>
  )
}
