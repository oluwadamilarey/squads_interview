'use client'

import { motion } from 'framer-motion'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function ScrollReveal({ 
  children, 
  delay = 0,
  className 
}: ScrollRevealProps) {
  const { ref, isIntersecting } = useIntersectionObserver()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
