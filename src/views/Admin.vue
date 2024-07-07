<template>
  <div class="entries-container">
    <header class="entries-header">
    <h1>Admin Panel</h1>
    <button @click="logout" class="logout-button">Logout</button>
    </header>
    <UserList :users="users" @permissionsUpdated="fetchUsers" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as adminApi from '../api/admin'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import UserList from '../components/Admin/UserList.vue'

const users = ref([])
const store = useStore()
const router = useRouter()

const fetchUsers = async () => {
  const response = await adminApi.fetchUsers()
  users.value = response
}

const logout = () => {
  store.dispatch('logout')
  router.push({ name: 'Login' })
}

onMounted(fetchUsers)
</script>
<style src="../styles.css"></style>