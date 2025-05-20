import { cn } from 'node_modules/@packages/components/src/lib/utils'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface ModalPortalProps {
  isOpen: boolean
  handleClose: () => void
  children: React.ReactNode
  className?: string
  dimValue?: number
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  height?: 'default' | 'full'
}

function ModalPortal({
  isOpen,
  handleClose,
  children,
  className = '',
  dimValue = 40,
  size = 'lg',
  height = 'default'
}: ModalPortalProps) {
  const sizeClass =
    size === 'sm'
      ? 'max-w-md'
      : size === 'md'
        ? 'max-w-lg'
        : size === 'lg'
          ? 'max-w-5xl'
          : 'max-w-full'
  const heightClass =
    height === 'default'
      ? 'h-[100%] md:max-h-[600px] md:max-h-[700px] lg:max-h-[800px]'
      : 'h-[100vh]'
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted || !isOpen) return null

  return createPortal(
    <div
      style={{ backgroundColor: `rgba(0, 0, 0, ${dimValue / 100})`}}
      className='fixed inset-0 z-50'
      onClick={handleClose}
    >
      <div
        className={cn(
          `absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 focus:outline-none`,
          'w-full bg-white overflow-y-auto overflow-visible rounded-2xl border-border p-4',
          heightClass,
          sizeClass,
          className
        )}
        style={{ scrollbarWidth: 'none' }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement
  )
}

export { ModalPortal }
