import Info from '@assets/icons/AICFO_INFO.svg?react'
import Alert from '@assets/icons/Alert.svg?react'
import Bad from '@assets/icons/Bad.svg?react'
import Bell from '@assets/icons/Bell.svg?react'
import Like from '@assets/icons/Like.svg?react'
import SettingIcon from '@assets/icons/Setting.svg?react'
import CalendarIcon from '@assets/icons/calendar.svg?react'
import ArrowDownTrayIcon from '@heroicons/react/24/outline/ArrowDownTrayIcon'
import ArrowRightOnRectangleIcon from '@heroicons/react/24/outline/ArrowRightOnRectangleIcon'
import BookOpenIcon from '@heroicons/react/24/outline/BookOpenIcon'
import CheckIcon from '@heroicons/react/24/outline/CheckIcon'
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon'
import ChevronLeftIcon from '@heroicons/react/24/outline/ChevronLeftIcon'
import ClockIcon from '@heroicons/react/24/outline/ClockIcon'
import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon'
import MegaphoneIcon from '@heroicons/react/24/outline/MegaphoneIcon'
import PhoneIcon from '@heroicons/react/24/outline/PhoneIcon'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import UserIcon from '@heroicons/react/24/outline/UserIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import FdsNew from '@assets/icons/Fds-New.svg?react'
import React from 'react'

interface IconWrapperProps {
  className?: string
  children: React.ReactElement
}

const IconWrapper = ({ className, children }: IconWrapperProps) => {
  const child = React.cloneElement(children, { className })
  return child
}

const createIcon = (Icon: React.ReactElement) => {
  return ({ className }: { className?: string }) => (
    <IconWrapper className={className}>{Icon}</IconWrapper>
  )
}

const icons = {
  search: createIcon(<MagnifyingGlassIcon />),
  user: createIcon(<UserIcon />),
  back: createIcon(<ChevronLeftIcon />),
  login: createIcon(<ArrowRightOnRectangleIcon />),
  download: createIcon(<ArrowDownTrayIcon />),
  alarm: createIcon(<ClockIcon />),
  expandMore: createIcon(<ChevronDownIcon />),
  push: createIcon(<MegaphoneIcon />),
  trash: createIcon(<TrashIcon />),
  alert: createIcon(<Alert />),
  brief: createIcon(<BookOpenIcon />),
  like: createIcon(<Like />),
  bad: createIcon(<Bad />),
  bell: createIcon(<Bell />),
  check: createIcon(<CheckIcon />),
  close: createIcon(<XMarkIcon />),
  headset: createIcon(<PhoneIcon />),
  setting: createIcon(<SettingIcon />),
  calendar: createIcon(<CalendarIcon />),
  info: createIcon(<Info />),
  fdsNew: createIcon(<FdsNew />),
}

export type CustomIconsName = keyof typeof icons

// prettier-ignore
interface CustomIconsProps extends React.HTMLAttributes<HTMLDivElement> {
  name: CustomIconsName
  description?: string
  text?: string
  className?: string
  width?: number
  height?: number
  badge?: boolean | number
  iconClassName?: string
}

export default function CustomIcons(
  {
    name,
    description,
    text,
    iconClassName,
    className,
    badge = false,
    width = 20,
    height = 20,
    ...props
  }: CustomIconsProps
) {
  const IconComponent = icons[name]

  return (
    <div
      className={`${'flex rounded-xl'} group flex flex-col items-center`}
      {...props}
    >
      <IconComponent className={className} />
      {text && <p className='text-center'>{text}</p>}
      {badge && <div className='absolute bg-red-500 h-2 w-2 top-0 right-0' />}
    </div>
  )
}
