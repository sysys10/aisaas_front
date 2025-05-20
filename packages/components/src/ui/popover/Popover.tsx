import { Popover as HeadlessPopover, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

import { cn } from '../../lib/utils'

interface PopoverProps {
  trigger: React.ReactNode
  children?: React.ReactNode
  align?: 'start' | 'center' | 'end'
  className?: string
}

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  children,
  align = 'start',
  className
}) => {
  const getAlignmentClasses = () => {
    switch (align) {
      case 'center':
        return 'left-1/2 -translate-x-1/2'
      case 'end':
        return 'right-0'
      default:
        return 'left-0'
    }
  }

  return (
    <HeadlessPopover className='relative'>
      {() => (
        <>
          <HeadlessPopover.Button as={React.Fragment}>
            {trigger}
          </HeadlessPopover.Button>
          <Transition
            as={Fragment}
            enter='transition duration-200 ease-out'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition duration-150 ease-in'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <HeadlessPopover.Panel
              className={cn(
                `absolute z-10 ${getAlignmentClasses()}`,
                className
              )}
            >
              <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
                <div className='relative bg-white p-4'>{children}</div>
              </div>
            </HeadlessPopover.Panel>
          </Transition>
        </>
      )}
    </HeadlessPopover>
  )
}
