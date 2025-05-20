import { useMemo } from 'react'

import { TableData } from '@packages/apis/types'
import { Table } from '@packages/components'

export function ChartTable({
  data,
  is_api
}: {
  data: TableData
  is_api: boolean
}) {
  const columns = useMemo(() => {
    if (!data.data_header || !data.data?.[0]) return []

    return Object.entries(data.data_header).map(([key, header]) => ({
      id: key,
      header: header.change_title || key,
      accessorKey: key,
      meta: {
        align: header.align,
        type: header.type
      }
    }))
  }, [data.data_header])

  return (
    <div className='my-2'>
      {data.key && (
        <div className='text-primary mb-2 text-xl'>
          {data.key.title || ''}{' '}
          <span className='text-lg text-tertiary'>
            {data.key.subtitle || ''}
          </span>
          <span className='text-lg text-tertiary'>{data.key.desc || ''}</span>
        </div>
      )}
      <Table is_api={is_api} data={data.data} columns={columns as any} />
    </div>
  )
}
