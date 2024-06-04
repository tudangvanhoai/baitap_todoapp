import axios from 'axios'
import { appConfig } from '@/config/app'

const apiClient = axios.create({
  baseURL: appConfig.api.url,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  config => config,
  error => {
    return Promise.reject(error)
  },
)

export default apiClient
