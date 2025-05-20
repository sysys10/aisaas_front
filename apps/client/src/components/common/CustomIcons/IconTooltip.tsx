// components/common/icons/IconTooltip.tsx
import { cn } from 'node_modules/@packages/components/src/lib/utils'

interface IconTooltipProps {
  description: string
  tooltipWidth?: string
  visible: boolean
}

export const IconTooltip = ({
  description,
  tooltipWidth,
  visible
}: IconTooltipProps) => {
  if (!description) return null

  return (
    <div
      className={cn(
        'absolute min-w-12 top-full left-1/2 -translate-x-1/2 z-50 rounded bg-gray-800 px-2 py-1 text-sm text-white',
        tooltipWidth,
        visible ? 'visible' : 'invisible group-hover:visible'
      )}
      style={{ transition: 'opacity 150ms', opacity: visible ? 1 : 0 }}
    >
      <p className='text-nowrap'>{description}</p>
    </div>
  )
}
