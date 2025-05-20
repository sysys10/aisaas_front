import { BankDataResponse, DateRangeParams } from '../types'
import { daquvApi } from './axiosInstance'

export const getReport = async ({
  startDate,
  endDate,
  option
}: DateRangeParams): Promise<BankDataResponse> => {
  let response
  if (option === 'D')
    response = await daquvApi.post('/fund/rest/fundDy', {
      startDate,
      endDate
    })
  else if (option === 'W')
    response = await daquvApi.post('/fund/rest/fundWy', {
      startDate,
      endDate
    })
  else if (option === 'M')
    response = await daquvApi.post('/fund/rest/fundMy', {
      startDate,
      endDate
    })
  else
    response = await daquvApi.post('/fund/rest/fundAll', {
      startDate,
      endDate
    })
  
  return response.data.body
}
