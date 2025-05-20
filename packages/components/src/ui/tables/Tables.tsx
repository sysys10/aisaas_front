import {
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { memo, useMemo, useState } from 'react'

import { cn } from '../../lib/utils'
import { TableBody } from './TableBody'
import { TableHeader } from './TableHeader'
import { useVirtualPagination } from './hooks/useVirtualPagination'
import { TableProps } from './types'
import { getTableColumns } from './utils'

function EmptyTableMessage({ message = '데이터가 없습니다.' }) {
  return (
    <div className='flex h-32 items-center justify-center rounded-lg bg-gray-50 text-gray-500'>
      {message}
    </div>
  )
}

export function Table<T extends object>({
  data,
  columns,
  is_api = false,
  emptyMessage,
  className,
  maxHeight = is_api ? 'auto' : '25rem'
}: TableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const { slicedData, hasNextPage, lastRowRef } = useVirtualPagination(data)

  const table = useReactTable({
    data: slicedData,
    columns: getTableColumns(columns),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
    defaultColumn: {
      size: 150, 
      minSize: 150,
      maxSize: 150, 
    },
  })

  if (!data?.length) {
    return <EmptyTableMessage message={emptyMessage} />
  }

  return useMemo(
    () => (
      <div
        data-table-component
        className={cn(
          'w-full rounded-lg overflow-hidden border border-gray-200',
          className
        )}
      >
        <div
          className='overflow-x-auto relative overflow-y-auto'
          style={{ maxHeight }}
        >
          <table className='w-full whitespace-nowrap'>
            <thead className='sticky top-0 z-10 bg-background-secondary border-b border-gray-200'>
              {table
                .getHeaderGroups()
                .map(
                  (headerGroup) =>
                    headerGroup.id !== 'curr_cd' && (
                      <TableHeader
                        key={headerGroup.id}
                        headerGroup={headerGroup}
                      />
                    )
                )}
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
    [hasNextPage, lastRowRef, sorting, table.getHeaderGroups, table.getRowModel]
  )
}

export default memo(Table) as typeof Table
