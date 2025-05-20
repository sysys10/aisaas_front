// components/ui/Table/types.ts
import { ColumnMeta as TanStackColumnMeta } from '@tanstack/react-table'

export interface ColumnMeta extends TanStackColumnMeta<any, unknown> {
  align: 'center' | 'left' | 'right'
  type: string
}

export interface TableColumn {
  id: string
  header: string
  accessorKey: string
  meta: ColumnMeta
}

export interface TableProps<T extends object> {
  data: T[]
  columns: TableColumn[]
  is_api?: boolean
  emptyMessage?: string
  className?: string
  maxHeight?: string
  header?: any
  queryInfo?: object
}

export interface TableCellProps {
  value: any
  column: TableColumn
  isFirstColumn?: boolean
  onClick?: () => void
}

export interface TableHeaderCellProps {
  header: any
  isFirstColumn?: boolean
}

export interface TableBodyProps {
  rows: any[]
  hasNextPage: boolean
  lastRowRef: React.RefObject<HTMLTableRowElement>
  headers: any[]
}
