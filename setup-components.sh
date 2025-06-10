
#!/bin/bash

# Sports Platform - Component Structure Generator
echo "🚀 Setting up Sports Platform component structure..."

# Create directory structure
echo "📁 Creating directory structure..."

# Main directories
mkdir -p src/components/{ui,sections,motion}
mkdir -p src/{hooks,lib,data,types}
mkdir -p public/images

# Create component files
echo "📝 Creating component files..."

# UI Components
cat > src/components/ui/Button.tsx << 'EOF'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2',
        {
          'bg-primary-500 hover:bg-primary-600 text-white': variant === 'primary',
          'bg-gray-700 hover:bg-gray-600 text-white': variant === 'secondary',
          'border border-gray-600 hover:bg-gray-800 text-white': variant === 'outline',
        },
        {
          'px-3 py-2 text-sm': size === 'sm',
          'px-4 py-2': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
EOF

cat > src/components/ui/Card.tsx << 'EOF'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div 
      className={cn(
        "bg-gray-800 rounded-lg p-6 border border-gray-700",
        hover && "transition-transform hover:scale-105",
        className
      )}
    >
      {children}
    </div>
  )
}
EOF

cat > src/components/ui/Badge.tsx << 'EOF'
import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        {
          'bg-gray-700 text-gray-300': variant === 'default',
          'bg-primary-500 text-white': variant === 'success',
          'bg-yellow-500 text-black': variant === 'warning',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
EOF

# Motion Components
cat > src/components/motion/ScrollReveal.tsx << 'EOF'
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
EOF

cat > src/components/motion/StaggerContainer.tsx << 'EOF'
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
EOF

cat > src/components/motion/FloatingCard.tsx << 'EOF'
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
EOF

# Section Components (Placeholders)
cat > src/components/sections/Hero.tsx << 'EOF'
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import ScrollReveal from '@/components/motion/ScrollReveal'

export function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              The New Way to
              <span className="text-primary-500"> Win Money</span>
              <br />on Sports
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 text-gray-300"
            >
              Pick more or less on player projections
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button size="lg" className="mr-4">
                Get Started
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
EOF

cat > src/components/sections/PlayerProjections.tsx << 'EOF'
'use client'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import StaggerContainer from '@/components/motion/StaggerContainer'
import ScrollReveal from '@/components/motion/ScrollReveal'
import { motion } from 'framer-motion'
import { players } from '@/data/mockData'
import { fadeInUp } from '@/lib/animations'

export function PlayerProjections() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <h2 className="text-4xl font-bold text-center mb-16">
            Player Projections
          </h2>
        </ScrollReveal>
        
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {players.map((player) => (
            <motion.div
              key={player.id}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
            >
              <Card hover>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                    {player.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{player.name}</h3>
                  <div className="flex justify-center gap-2 mb-3">
                    <Badge>{player.team}</Badge>
                    <Badge variant="success">{player.position}</Badge>
                  </div>
                  <div className="text-2xl font-bold text-primary-500 mb-2">
                    {player.projection} PTS
                  </div>
                  <div className="text-gray-400">{player.odds}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
EOF

cat > src/components/sections/SquadsSection.tsx << 'EOF'
'use client'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import ScrollReveal from '@/components/motion/ScrollReveal'
import FloatingCard from '@/components/motion/FloatingCard'
import { squads } from '@/data/mockData'

export function SquadsSection() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <h2 className="text-4xl font-bold text-center mb-16">
            Join Elite Squads
          </h2>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {squads.map((squad, index) => (
            <FloatingCard key={squad.id} delay={index * 0.2}>
              <Card className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mx-auto mb-6"></div>
                <h3 className="text-xl font-bold mb-3">{squad.name}</h3>
                <p className="text-gray-400 mb-4">{squad.description}</p>
                <div className="text-2xl font-bold text-primary-500 mb-6">{squad.value}</div>
                <Button className="w-full">Join Squad</Button>
              </Card>
            </FloatingCard>
          ))}
        </div>
      </div>
    </section>
  )
}
EOF

cat > src/components/sections/Ecosystem.tsx << 'EOF'
'use client'

import ScrollReveal from '@/components/motion/ScrollReveal'

export function Ecosystem() {
  return (
    <section className="py-20 bg-gray-800 text-white">
      <div className="container mx-auto px-6 text-center">
        <ScrollReveal>
          <h2 className="text-4xl font-bold mb-8">
            Join an Ecosystem That Keeps Giving
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Be part of a community where your success drives collective rewards
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
EOF

cat > src/components/sections/Footer.tsx << 'EOF'
export function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-2xl font-bold mb-4">Sports Platform</h3>
        <p className="text-gray-400">© 2024 Sports Platform. All rights reserved.</p>
      </div>
    </footer>
  )
}
EOF

# Hooks
cat > src/hooks/useIntersectionObserver.ts << 'EOF'
import { useEffect, useRef, useState } from 'react'

export function useIntersectionObserver(threshold = 0.1) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isIntersecting }
}
EOF

cat > src/hooks/useScrollProgress.ts << 'EOF'
import { useEffect, useState } from 'react'

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const progress = scrolled / scrollHeight
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return scrollProgress
}
EOF

# Lib files
cat > src/lib/utils.ts << 'EOF'
import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
EOF

cat > src/lib/animations.ts << 'EOF'
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const scaleOnHover = {
  hover: { 
    scale: 1.05,
    transition: { type: "spring", stiffness: 300 }
  }
}

export const slideInFromLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 }
}
EOF

# Types
cat > src/types/index.ts << 'EOF'
export interface Player {
  id: string
  name: string
  team: string
  position: string
  projection: number
  odds: string
  image: string
}

export interface Squad {
  id: string
  name: string
  description: string
  image: string
  value: string
}
EOF

# Mock Data
cat > src/data/mockData.ts << 'EOF'
import { Player, Squad } from '@/types'

export const players: Player[] = [
  {
    id: '1',
    name: 'LeBron James',
    team: 'LAL',
    position: 'SF',
    projection: 25.5,
    odds: '+110',
    image: '/images/player-1.jpg'
  },
  {
    id: '2',
    name: 'Stephen Curry',
    team: 'GSW',
    position: 'PG',
    projection: 28.5,
    odds: '+105',
    image: '/images/player-2.jpg'
  },
  {
    id: '3',
    name: 'Giannis Antetokounmpo',
    team: 'MIL',
    position: 'PF',
    projection: 31.2,
    odds: '+120',
    image: '/images/player-3.jpg'
  },
  {
    id: '4',
    name: 'Luka Dončić',
    team: 'DAL',
    position: 'PG',
    projection: 29.8,
    odds: '+115',
    image: '/images/player-4.jpg'
  }
]

export const squads: Squad[] = [
  {
    id: '1',
    name: 'The Shooters',
    description: 'Elite 3-point specialists who dominate from beyond the arc',
    image: '/images/squad-1.jpg',
    value: '$1,000'
  },
  {
    id: '2',
    name: 'Paint Dominators',
    description: 'Big men who control the paint and rack up rebounds',
    image: '/images/squad-2.jpg',
    value: '$2,500'
  },
  {
    id: '3',
    name: 'Floor Generals',
    description: 'Point guards who create opportunities for everyone',
    image: '/images/squad-3.jpg',
    value: '$1,800'
  }
]
EOF

# Update main page
cat > src/app/page.tsx << 'EOF'
import { Hero } from '@/components/sections/Hero'
import { PlayerProjections } from '@/components/sections/PlayerProjections'
import { SquadsSection } from '@/components/sections/SquadsSection'
import { Ecosystem } from '@/components/sections/Ecosystem'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <PlayerProjections />
      <SquadsSection />
      <Ecosystem />
      <Footer />
    </main>
  )
}
EOF

# Create placeholder images directory
touch public/images/.gitkeep

echo "✅ Component structure created successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Add your actual images to public/images/"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Customize components and styles as needed"
echo ""
echo "🎉 Your sports platform is ready for development!"