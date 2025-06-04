import axios from 'axios'
import { Configuration, DefaultApi } from '@/api-client'
import { useToast } from 'vue-toastification'

const toast = useToast()

// Create axios instance with interceptor
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
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
    new Configuration(),
    undefined,
    axiosInstance,
  )
