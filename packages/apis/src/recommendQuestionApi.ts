import { RecommendQuestionResponse } from '../types'
import { daquvApi } from './axiosInstance'

export const recommendQuestionApi =
  async (): Promise<RecommendQuestionResponse> => {
    const { data } = await daquvApi.post('/recommendList')
    return data
  }
