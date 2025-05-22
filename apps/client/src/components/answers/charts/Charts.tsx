import { useMemo } from 'react'

import { TableData } from '@types'

import { ChartTable } from './ChartTable'

interface ChartsProps {
  table_data: TableData[]
  is_api: boolean
}

export function Charts({ table_data, is_api }: ChartsProps) {
  console.log('table_data', table_data)
  return useMemo(
    () => (
      <>
        {/* {table_data?.length > 0 &&
          table_data.map((data, index) => {
            return <ChartTable key={index} data={data} is_api={is_api} />
          })} */}
      </>
    ),
    [table_data, is_api]
  )
}
