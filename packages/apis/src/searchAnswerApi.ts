import { SearchAnswerResponse, SearchRequest } from '../types'
import { daquvApi } from './axiosInstance'

export const searchAnswerApi = async ({
  utterance,
  session_id,
  custCd
}: SearchRequest): Promise<SearchAnswerResponse> => {
  const { data } = await daquvApi.post('/llm/utterance', {
    utterance: utterance == '계속하기' ? 'next_page' : utterance,
    session_id,
    custCd
  })
  return data
}
