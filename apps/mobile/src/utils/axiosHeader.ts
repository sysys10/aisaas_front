import { daquvApi } from '@packages/apis'

const setHeader = (token: string) => {
  return (daquvApi.defaults.headers.common['JWT-Token'] = token)
}
const getHeader = () => {
  return daquvApi.defaults.headers.common['JWT-Token']
}

export { setHeader, getHeader }
