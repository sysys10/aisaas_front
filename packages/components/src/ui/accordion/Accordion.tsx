import { Disclosure, Transition } from '@headlessui/react'
import ChevronUpIcon from '@heroicons/react/24/outline/ChevronUpDownIcon'
import React from 'react'

import { cn } from '../../lib/utils'

export interface AccordionItem {
  title: string
  content: React.ReactNode
}

export interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

export function Accordion({ items, className }: AccordionProps) {
  return (
    <div className={cn('w-full', className)}>
      {items.map((item, index) => (
        <Disclosure key={index}>
          {({ open }: { open: boolean }) => (
            <>
              <Disclosure.Button className='flex w-full justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75'>
                <span>{item.title}</span>
                <ChevronUpIcon
                  className={cn(
                    'h-5 w-5 text-gray-500 transition-transform',
                    open ? 'rotate-180 transform' : ''
                  )}
                />
              </Disclosure.Button>
              <Transition
                as={React.Fragment}
                enter='transition ease-out duration-200'
                enterFrom='opacity-0 translate-y-1'
                enterTo='opacity-100 translate-y-0'
                leave='transition ease-in duration-150'
                leaveFrom='opacity-100 translate-y-0'
                leaveTo='opacity-0 translate-y-1'
              >
                <Disclosure.Panel className='pt-1 pb-2 text-sm text-gray-600'>
                  {item.content}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  )
}
