import axios from 'axios'
import { Configuration, DefaultApi } from '@/api-client'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'

// Create axios instance with interceptor
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
})

// Pass axios instance in Configuration if supported
export const useApi = () => {
  const toast = useToast()
  const { t } = useI18n()

  axiosInstance.interceptors.response.use(
    (response) => {
      // Show success toast for non-GET requests
      if (response.config.method !== 'get') {
        toast.success(t('messages.success'))
      }
      return response
    },
    (error) => {
      toast.error(error.response?.data?.message || error.message || t('messages.error'))
      return Promise.reject(error)
    },
  )

  return new DefaultApi(new Configuration(), undefined, axiosInstance)
}
