<template>
  <v-card class="mx-auto my-4 pa-4" elevation="4" rounded="xl" max-width="500">
    <v-card-title class="text-h6 font-weight-bold">
      {{ container.Names[0]?.replace('/', '') }}
    </v-card-title>

    <v-card-subtitle class="text-subtitle-2 mb-2">
      {{ container.Status }}
    </v-card-subtitle>

    <v-divider class="my-2"></v-divider>

    <v-card-text>
      <v-list density="compact">
        <v-list-item>
          <v-list-item-title
            ><strong>{{ $t('container.image') }}:</strong> {{ container.Image }}</v-list-item-title
          >
        </v-list-item>
        <v-list-item>
          <v-list-item-title
            ><strong>{{ $t('container.state') }}:</strong> {{ container.State }}</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-card-text>

    <v-divider class="my-2"></v-divider>

    <v-card-actions class="justify-center">
      <v-tooltip text="Start" v-if="container.State !== 'running'">
        <template #activator="{ props }">
          <v-btn v-bind="props" @click="handle('start')" color="green" variant="flat" icon>
            <v-icon>mdi-play</v-icon>
          </v-btn>
        </template>
      </v-tooltip>

      <v-tooltip text="Stop" v-if="container.State === 'running'">
        <template #activator="{ props }">
          <v-btn v-bind="props" @click="handle('stop')" color="orange" variant="flat" icon>
            <v-icon>mdi-stop</v-icon>
          </v-btn>
        </template>
      </v-tooltip>

      <v-tooltip text="Restart">
        <template #activator="{ props }">
          <v-btn v-bind="props" @click="handle('restart')" color="blue" variant="flat" icon>
            <v-icon>mdi-restart</v-icon>
          </v-btn>
        </template>
      </v-tooltip>

      <v-tooltip text="Kill">
        <template #activator="{ props }">
          <v-btn v-bind="props" @click="handle('kill')" color="red" variant="flat" icon>
            <v-icon>mdi-cancel</v-icon>
          </v-btn>
        </template>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { DockerodeContainerInfo } from '@/api-client'
import { useContainerStore } from '@/stores/containerStore'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  container: DockerodeContainerInfo
}>()

const { t } = useI18n()
const store = useContainerStore()

const handle = async (action: 'start' | 'stop' | 'restart' | 'kill') => {
  try {
    const fn = store[action]
    await fn(props.container.Id)
    await store.fetchContainers()
  } catch (err) {
    console.error(t('messages.error'), err)
  }
}
</script>
