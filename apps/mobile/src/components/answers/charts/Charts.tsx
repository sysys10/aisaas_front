import { useMemo } from 'react'

import { TableData } from '@packages/apis/types'

import { ChartTable } from './ChartTable'

interface ChartsProps {
  table_data: TableData[]
  is_api: boolean
}

export function Charts({ table_data, is_api }: ChartsProps) {
  return useMemo(
    () => (
      <>
        <div className='flex items-center justify-between'>
          <p className='text-lg text-primary'></p>
        </div>
        {table_data.length > 0 &&
          table_data.map((data, index) => {
            return <ChartTable key={index} data={data} is_api={is_api} />
          })}
      </>
    ),
    [table_data, is_api]
  )
}
