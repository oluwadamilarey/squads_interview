'use client'

import { motion } from 'framer-motion'
import { staggerContainer } from '@/lib/animations'

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
}

export default function StaggerContainer({ children, className }: StaggerContainerProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
