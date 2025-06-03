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
    <v-main class='app'>
      <v-container class="py-8">
        <!-- Page title -->
        <h1 class="text-h3 font-weight-bold mb-8 text-center">
          {{ $t('dashboard.title') }}
        </h1>

        <!-- If no containers, show a friendly message -->
        <div v-if="store.containers.length === 0" class="text-center text-subtitle-1 grey--text">
          {{ $t('dashboard.noContainers') || 'No containers found.' }}
        </div>

        <!-- Containers grid -->
        <v-row
          v-else
          dense
          justify="center"
          class="g-6"
        >
          <v-col
            v-for="container in store.containers"
            :key="container.Id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <ContainerCard :container="container" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
 .app{
    background-color: #b7aee8;
 }

.g-6 {
  gap: 24px;
}
</style>
