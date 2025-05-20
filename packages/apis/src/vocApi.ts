import { SaveVocApiProps } from '../types'
import { AdminDaquvResponse } from '../types'
import { formDataApi } from './axiosInstance'

// 타입 임포트

export const saveVocApi = async ({
  VocData
}: {
  VocData: SaveVocApiProps
}): Promise<AdminDaquvResponse> => {
  const { channel, content, utterance, type, sessionId, chainId } = VocData
  const formData = new FormData()
  formData.append('chainId', chainId)
  formData.append('channel', channel)
  formData.append('content', content)
  formData.append('conversationId', sessionId)
  formData.append('utterance', utterance)
  formData.append('type', type)
  const { data } = await formDataApi.post('/voc/save', formData)
  return data
}

export const getVocApi = async ({ vocId }: { vocId: number }) => {
  const { data } = await formDataApi.get(`/getVocData/${vocId}`)
  return data
}
