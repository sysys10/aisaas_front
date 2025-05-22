import { SearchAnswerResponse, SearchRequest } from '../types'
import { daquvApi } from './axiosInstance'

export const searchAnswerApi = async ({
  utterance,
  session_id,
  custCd
}: SearchRequest): Promise<SearchAnswerResponse> => {
  const { data } = await daquvApi.post('/llm/utterance', {
    utterance,
    session_id,
    custCd
  })
  return data
}
