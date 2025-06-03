import { Configuration, DefaultApi } from '@/api-client'

export const useApi = () =>
  new DefaultApi(
    new Configuration({
      basePath: 'http://localhost:3000',
    }),
  )
