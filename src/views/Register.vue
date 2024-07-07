<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input type="text" v-model="username" placeholder="Username" required class="input-field" />
      <input type="email" v-model="email" placeholder="Email" required class="input-field" />
      <input type="password" v-model="password" placeholder="Password" required class="input-field" />
      <button type="submit" class="submit-button">Register</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import * as authApi from '../api/auth'

const username = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()
const store = useStore()

const register = async () => {
  try {
    const response = await authApi.register({ username: username.value, email: email.value, password: password.value })
    if(response) {
      await store.dispatch('login', { email: email.value, password: password.value })
      const userRole = store.state.auth.user
      if (userRole === 'admin') {
        router.push({ name: 'Admin' })
      } else if (userRole === 'user') {
        router.push({ name: 'Entries' })
      }
    }
  } catch (error) {
    console.error('Registration failed', error)
  }
}
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
}

.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #45a049;
}
</style>
