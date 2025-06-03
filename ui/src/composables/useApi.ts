import axios from 'axios'
import { Configuration, DefaultApi } from '@/api-client'
import { useToast } from 'vue-toastification'

const toast = useToast()

// Create axios instance with interceptor
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
})

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    toast.error(error.response?.data?.message || error.message || 'API Error')
    return Promise.reject(error)
  },
)

// Pass axios instance in Configuration if supported
export const useApi = () =>
  new DefaultApi(
    new Configuration({
      basePath: 'http://localhost:3000',
      // Add axiosInstance if your Configuration accepts it, for example:
      // httpClient: axiosInstance,
    }),
    undefined,
    axiosInstance,
  )
