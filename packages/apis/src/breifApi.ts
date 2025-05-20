import { BrfType, BriefResponse } from '../types'
import { daquvApi } from './axiosInstance'

const getBrf = async (): Promise<BriefResponse> => {
  const { data } = await daquvApi.post('/brf/rest/list')
  return data
}

const putBrf = async (
  brfData: Pick<BrfType, 'brfInfo' | 'brfAlarmSetting'>
) => {
  const { data } = await daquvApi.post('/brf/rest/update', {
    brfData
  })
  return data
}

const deleteBrf = async (briefingSeq: number) => {
  const { data } = await daquvApi.post('/brf/rest/delete', {
    briefingSeq
  })
  return data
}

const saveBrf = async (brfData: BrfType) => {
  const { data } = await daquvApi.post('/brf/rest/save', {
    brfData
  })
  return data
}

export { getBrf, putBrf, deleteBrf, saveBrf }
