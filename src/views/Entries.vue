<template>
  <div class="entries-container">
    <header class="entries-header">
      <h1>{{user.username}}</h1>
      <button @click="logout" class="logout-button">Logout</button>
    </header>
    <div class="entries-content">
      <CreateEntry v-if="user.permissions.canEditEntries" @entryCreated="fetchEntries" />
      <EntryList v-if="user.permissions.canViewAllEntries || user.permissions.canViewEntries" :permissions="user.permissions" :entries="entries" @entryUpdated="fetchEntries" @entryDeleted="fetchEntries" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import * as entriesApi from '../api/entries'
import CreateEntry from '../components/Entries/CreateEntry.vue'
import EntryList from '../components/Entries/EntryList.vue'

const entries = ref([])
const store = useStore()
const router = useRouter()

let user = store.state.auth.user

const fetchEntries = async () => {
  const data = await entriesApi.fetchEntries()
  entries.value = data
}

const logout = () => {
  store.dispatch('logout')
  router.push({ name: 'Login' })
}

onMounted(fetchEntries)
</script>

<style scoped>

</style>
