import React from 'react'

interface IconWrapperProps {
  className?: string
  children: React.ReactElement
}

export const IconWrapper = ({ className, children }: IconWrapperProps) => {
  return React.cloneElement(children, {
    className: className || 'w-full h-full',
    'aria-hidden': true
  })
}
