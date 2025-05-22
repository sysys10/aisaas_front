import { SaveVocApiProps } from '../types'
import { AdminDaquvResponse } from '../types'
import { daquvApi, formDataApi } from './axiosInstance'

// 타입 임포트

export const saveVocApi = async ({
  VocData
}: {
  VocData: SaveVocApiProps
}): Promise<AdminDaquvResponse> => {
  const { channel, content, utterance, type, sessionId, chainId } = VocData

  const { data } = await daquvApi.post('/voc/save', {type,chainId, channel, content, conversationId: sessionId, utterance})
  return data
}

export const getVocApi = async ({ vocId }: { vocId: number }) => {
  const { data } = await formDataApi.get(`/getVocData/${vocId}`)
  return data
}
