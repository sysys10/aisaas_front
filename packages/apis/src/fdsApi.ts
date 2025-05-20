import { AlarmType } from '../types'
import { daquvApi } from './axiosInstance'

export const getFdsList = async ({
  startDate,
  endDate,
  page
}: {
  startDate?: string
  endDate?: string
  page: number
}): Promise<AlarmType[]> => {
  const { data } = await daquvApi.post('/push/fds/list', {
    startDate,
    endDate,
    page
  })
  return data.body.data
}

export const getFdsCount = async () => {
  const { data } = await daquvApi.post('/push/fds/unread-count')
  return data
}
