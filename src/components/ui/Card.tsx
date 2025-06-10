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
