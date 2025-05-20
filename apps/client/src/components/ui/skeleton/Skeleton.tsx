import { cn } from 'node_modules/@packages/components/src/lib/utils'

export function Skeleton({ className }: { className: string }) {
  return <div className={cn('bg-gray-100 animate-pulse', className)}></div>
}
