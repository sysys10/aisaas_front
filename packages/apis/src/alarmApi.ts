import { AlarmResponse, DefaultResponse } from '../types'
import { daquvApi } from './axiosInstance'

export interface GetAlarmCountResponse extends DefaultResponse {
  body: {
    unReadCnt: number
  }
}

const getAlarmCount = async (): Promise<GetAlarmCountResponse> => {
  const { data } = await daquvApi.post('/push/unread-count')
  return data
}

const getAlarm = async (): Promise<AlarmResponse> => {
  const { data } = await daquvApi.post('/push/list')
  return data
}
const deleteAlarm = async (
  pushNotificationHistorySeq?: number
): Promise<DefaultResponse> => {
  const { data } = await daquvApi.post(`/push/delete-history/${pushNotificationHistorySeq}`)
  return data
}
const setAlarmRead = async (
  pushNotificationHistorySeq?: number
): Promise<DefaultResponse> => {
  if (pushNotificationHistorySeq) {
    const { data } = await daquvApi.post(
      `/push/read-status/${pushNotificationHistorySeq}`
    )
    return data
  } else {
    const { data } = await daquvApi.post('/push/read-status')
    return data
  }
}

export { getAlarm, setAlarmRead, getAlarmCount,deleteAlarm }
