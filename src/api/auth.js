import axios from '../axios'

export const register = async (credentials) => {
  const response = await axios.post('/register', credentials)
  return response.data
}

export const login = async (credentials) => {
  const response = await axios.post('/login', credentials)
  return response.data
}

export const logout = async () => {
  await axios.post('/logout')
}
