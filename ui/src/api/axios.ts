import axios from 'axios'
import { useToast } from 'vue-toastification'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
})

const toast = useToast()

// Add response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    toast.error(error.response?.data?.message || error.message || 'API Error')
    return Promise.reject(error)
  }
)

export default api
