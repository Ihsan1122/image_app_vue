import axios from '../axios'

export const fetchUsers = async () => {
  const response = await axios.get('/api/admin/users')
  return response.data
}

export const updateUserPermissions = async (userId, permissions) => {
  await axios.put(`/api/admin/users/${userId}/permissions`, permissions)
}
