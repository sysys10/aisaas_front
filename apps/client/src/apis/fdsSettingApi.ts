import { daquvApi } from '@apis'

import { DefaultResponse } from '@types'
export interface FdsSettingProps {
  inAmount: number
  outAmount: number
  inYn: boolean
  outYn: boolean
}
export interface FdsTimeProps {
  timeUseYn: "Y" | "N"
  timeStart: string
  timeEnd: string
}

export interface SaveFdsTimeResponse extends DefaultResponse {
  body: {
    fdsTimeUseYn: 'Y' | 'N'
    fdsTimeStart: string
    fdsTimeEnd: string
  }
}

export interface FdsSettingResponse extends DefaultResponse {
  body: FdsSettingProps & FdsTimeProps
}
export async function getFdsSettingApi(): Promise<FdsSettingResponse> {
  const { data } = await daquvApi.get('/push/user/fds/data')
  return data
}

export interface SaveFdsSettingResponse extends DefaultResponse {
  body: {
    inOutDv: '1' | '2'
    amount: string
    useYn: 'Y' | 'N'
  }
}


export async function saveFdsTimeApi(data: {
  timeUseYn: boolean
  timeStart: string
  timeEnd: string
}): Promise<SaveFdsTimeResponse> {
  const response = await daquvApi.post('/push/user/fds/time', {
    fds_TIME_USE_YN: data.timeUseYn ? 'Y' : 'N',
    fds_TIME_START: data.timeStart,
    fds_TIME_END: data.timeEnd
  })
  return response.data
}
export async function saveFdsSettingApi(data: {
  useYn: boolean
  amount: string
  inOutDv: '1' | '2'
}): Promise<SaveFdsSettingResponse> {
  const response = await daquvApi.post('/push/user/fds', {
    useYn: data.useYn ? 'Y' : 'N',
    amount: data.amount,
    inOutDv: data.inOutDv
  })
  return response.data
}
