import { IconName } from './registry'

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: boolean
  name: IconName
  description?: string
  text?: string
  className?: string
  iconClassName?: string
  tooltipWidth?: string
  fill?: string
  row?: boolean
}
