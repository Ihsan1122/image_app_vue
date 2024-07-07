import axios from 'axios'
import store from './store'

const instance = axios.create({
  baseURL: 'http://localhost:3333', 
})

instance.interceptors.request.use(config => {
  const token = store.state.auth.token || localStorage.getItem('authToken')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

export default instance
