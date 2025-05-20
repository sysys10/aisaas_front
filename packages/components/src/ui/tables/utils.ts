// components/ui/Table/utils.ts
import { createColumnHelper } from '@tanstack/react-table'

import { formatDate, formatNumber, formatTime } from '../../lib/format'
import { TableColumn } from './types'

// 날짜 포맷팅 함수
export const formatDateTime = (value: string) => {
  if (!value) return ''
  return value.replace(
    /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
    '$1-$2-$3 $4:$5:$6'
  )
}

// 값 렌더링 함수
export const renderCellValue = (
  value: string,
  columnType: string,
  currencySymbol = 'KRW'
) => {
  if (value === null || value === undefined) return ''
  switch (columnType) {
    case 'text':
      return value
    case 'number':
      return formatNumber(value, currencySymbol)
    case 'date':
      return formatDate(value)
    case 'datetime':
      return formatDateTime(value)
    case 'time':
      return formatTime(value)
    case 'cash':
      return `${formatNumber(value, currencySymbol)}`
    case 'percentage':
      return `${Number(value).toFixed(2)}%`
    default:
      return value
  }
}

// 숫자 정렬 함수
export const numericSort = (rowA: any, rowB: any, columnId: string): number => {
  const a = Number(rowA.original[columnId])
  const b = Number(rowB.original[columnId])
  return isNaN(a) && isNaN(b)
    ? 0
    : isNaN(a)
      ? 1
      : isNaN(b)
        ? -1
        : a < b
          ? -1
          : a > b
            ? 1
            : 0
}

// 테이블 열 생성 함수
export const getTableColumns = (columns: TableColumn[]) => {
  const columnHelper = createColumnHelper<any>()
  return columns.map((column) => {
    return columnHelper.accessor(column.accessorKey, {
      header: column.header,
      cell: (info) => {
        if (column.meta.type === 'cash' || column.meta.type === 'number') {
          if (info.row.original.curr_cd !== 'KRW') {
            return renderCellValue(
              info.getValue(),
              column.meta.type,
              info.row.original.curr_cd
            )
          } else {
            return renderCellValue(info.getValue(), column.meta.type, 'KRW')
          }
        } else {
          return renderCellValue(info.getValue(), column.meta.type)
        }
      },
      meta: column.meta,
      sortingFn: ['number', 'cash', 'percentage'].includes(column.meta.type)
        ? numericSort
        : 'alphanumeric'
    })
  })
}
