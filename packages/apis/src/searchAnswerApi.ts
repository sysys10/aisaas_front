import { SearchAnswerResponse, SearchRequest } from '../types'
import { daquvApi } from './axiosInstance'

export const searchAnswerApi = async ({
  utterance,
  session_id,
  cust_cd
}: SearchRequest): Promise<SearchAnswerResponse> => {
  const { data } = await daquvApi.post('/llm/utterance', {
    utterance,
    session_id,
    cust_cd
  })
  return data
}
