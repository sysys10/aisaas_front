import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { memo, useMemo } from 'react'

import { cn } from '../../lib/utils'
import { TableBody } from './TableBody'
import { TableHeader } from './TableHeader'
import { useVirtualPagination } from './hooks/useVirtualPagination'
import { TableProps } from './types'
import { getTableColumns } from './utils'

function EmptyNewsTableMessage({ message = '데이터가 없습니다.' }) {
  return (
    <div className='flex h-32 items-center justify-center rounded-lg bg-gray-50 text-gray-500'>
      {message}
    </div>
  )
}

export function NewsTable<T extends object>({
  data,
  columns,
  is_api = false,
  emptyMessage,
  className,
  queryInfo,
  maxHeight = is_api ? 'auto' : '25rem'
}: TableProps<T>) {
  const { slicedData, hasNextPage, lastRowRef } = useVirtualPagination(data)
  const table = useReactTable({
    data: slicedData,
    columns: getTableColumns(columns),
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      size: 200, 
      minSize: 200,
      maxSize: 400,
    },
  })

  if (!data?.length) {
    return <EmptyNewsTableMessage message={emptyMessage} />
  }
  
  return useMemo(
    () => 
      (
      <div
        data-table-component
        className={cn(
          'w-full rounded-lg overflow-hidden border border-gray-200',
          className
        )}
      >
        <div
          className='overflow-x-auto text-sm relative overflow-y-auto'
          style={{ maxHeight }}
        >
          <table className={`w-full whitespace-nowrap border-separate border-spacing-y-[0.5px]`}>
            <thead className='sticky top-0 z-10 bg-background-secondary border-b border-gray-200'>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableHeader key={headerGroup.id} headerGroup={headerGroup} />
              ))}
            </thead>
            <tbody className='divide-y divide-gray-200'>
              <TableBody
                rows={table.getRowModel().rows}
                hasNextPage={hasNextPage}
                lastRowRef={lastRowRef}
                headers={table.getHeaderGroups()[0].headers}
              />
            </tbody>
          </table>
        </div>
      </div>
    ),
    [hasNextPage, lastRowRef, table.getHeaderGroups, table.getRowModel, queryInfo]
  )
}

export default NewsTable as typeof NewsTable

