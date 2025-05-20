import axios from 'axios'

const daquvConfig = {
  apiUrl: import.meta.env.VITE_DAQUV_API_URL
}
const daquvApi = axios.create({
  baseURL: daquvConfig.apiUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': '*'
  }
})

const formDataApi = axios.create({
  baseURL: daquvConfig.apiUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

export { daquvApi, formDataApi }
