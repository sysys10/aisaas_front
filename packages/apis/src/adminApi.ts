import { daquvApi } from './axiosInstance'

export const openAdminApi = async () => {
  const { data } = await daquvApi.post('/auth/admin')
  return data
}
