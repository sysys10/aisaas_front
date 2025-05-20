import { cn } from 'node_modules/@packages/components/src/lib/utils'
import { Suspense, forwardRef, useState } from 'react'

import { IconTooltip } from './IconTooltip'
import { iconRegistry } from './registry'
import { IconProps } from './type'

// 로딩 대체 아이콘
const IconFallback = () => (
  <div className='animate-pulse w-full h-full bg-gray-200 rounded' />
)

const CustomIcons = forwardRef<HTMLDivElement, IconProps>(
  (
    {
      name,
      badge = false,
      row = false,
      description,
      text,
      className,
      fill,
      iconClassName = 'w-5 h-5',
      tooltipWidth = 'w-fit',
      ...props
    },
    ref
  ) => {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false)
    const IconComponent = iconRegistry[name]

    if (!IconComponent) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          'group relative text-sm cursor-pointer flex items-center justify-center',
          row ? 'flex-row gap-x-2' : 'flex-col',
          className
        )}
        onMouseEnter={() => {
          description && setIsTooltipVisible(true)
        }}
        onMouseLeave={() => description && setIsTooltipVisible(false)}
        {...props}
      >
        {badge && (
          <div className='absolute top-0 right-0 bg-red-500 rounded-full p-1 w-2 h-2'></div>
        )}

        <div className={iconClassName}>
          <Suspense fallback={<IconFallback />}>
            <IconComponent className={`h-full w-full ${fill}`} />
          </Suspense>
        </div>

        {description && (
          <IconTooltip
            description={description}
            tooltipWidth={tooltipWidth}
            visible={isTooltipVisible}
          />
        )}

        {text && <p className='text-center'>{text}</p>}
      </div>
    )
  }
)

CustomIcons.displayName = 'CustomIcons'
export default CustomIcons
