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
