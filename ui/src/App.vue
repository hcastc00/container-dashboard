<script setup lang="ts">
import { onMounted } from 'vue'
import { useContainerStore } from '@/stores/containerStore'
import ContainerCard from '@/components/ContainerCard.vue'

const store = useContainerStore()

onMounted(() => {
  store.fetchContainers()
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <h1 class="text-h4 mb-4">{{ $t('dashboard.title') }}</h1>
        <v-row>
          <v-col v-for="c in store.containers" :key="c.Id" cols="12" sm="6" md="4">
            <ContainerCard :container="c" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
