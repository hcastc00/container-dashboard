import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApi } from '@/composables/useApi'
import type { DockerodeContainerInfo } from '@/api-client'

export const useContainerStore = defineStore('container', () => {
  const containers = ref<DockerodeContainerInfo[]>([])
  const loading = ref(false)

  const api = useApi()

  const fetchContainers = async () => {
    loading.value = true
    containers.value = await api.listContainers().then((response) => response.data)
    loading.value = false
  }

  const start = (id: string) => api.startContainer(id)
  const stop = (id: string) => api.stopContainer(id)
  const restart = (id: string) => api.restartContainer(id)
  const kill = (id: string) => api.killContainer(id)

  return {
    containers,
    loading,
    fetchContainers,
    start,
    stop,
    restart,
    kill,
  }
})
