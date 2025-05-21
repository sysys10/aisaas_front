import { LoginFormValues, LoginResponse } from '../types'
import { daquvApi } from './axiosInstance'

const postLogin = async (data: LoginFormValues): Promise<LoginResponse> => {
  const response = await daquvApi.post('/login', {
    userId: data.userId,
    password: data.password,
    loginMode: '1'
  })
  return response.data
}

const changeInttId = async (data: {
  useInttId: string
  useTokenYn: string
}): Promise<LoginResponse> => {
  const response = await daquvApi.post('/login', data)
  return response.data
}

const changeMainCompany = async (data: { useInttId: string }) => {
  const response = await daquvApi.post('/upd/mainCompany', data)
  return response.data
}

const postLogout = async (): Promise<LoginResponse> => {
  const response = await daquvApi.post('/logout')
  return response.data
}

const getRefreshInfo = async (): Promise<LoginResponse> => {
  const response = await daquvApi.get('/user/refresh-info')
  return response.data
}

export {
  postLogin,
  postLogout,
  changeInttId,
  changeMainCompany,
  getRefreshInfo
}
