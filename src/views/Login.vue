<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login" class="login-form">
      <input type="email" v-model="email" placeholder="Email" required class="input-field">
      <input type="password" v-model="password" placeholder="Password" required class="input-field">
      <button type="submit" class="login-button">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const store = useStore()
const router = useRouter()

const login = async () => {
  try {
    await store.dispatch('login', { email: email.value, password: password.value })
    const userRole = store.state.auth.user.role
    if (userRole === 'admin') {
      router.push({ name: 'Admin' })
    } else {
      router.push({ name: 'Entries' })
    }
  } catch (error) {
    console.error('Login failed:', error)
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.input-field {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.login-button {
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
}

.login-button:hover {
  background-color: #4caf50;
}
</style>
