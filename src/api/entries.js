import axios from '../axios'

export const createEntry = async (data) => {
   try {
  const response = await axios.post('/api/entries', data)
  return response.data
    } catch (error) {
        if (error.response && error.response.status === 401) {
             alert('You do not have permission to Create/Edit entries.');
        }
        throw error;
    }
}

export const fetchEntries = async () => {
  try {
  const response = await axios.get('/api/entries')
  return response.data
  } catch (error) {
    if (error.response && error.response.status === 401) {
         alert('You do not have permission to view entries.');
    }
    throw error;
  }
}

export const updateEntry = async (entryId, data) => {
try {
  const response = await axios.put(`/api/entries/${entryId}`, data)
  return response.data
} catch (error) {
    if (error.response && error.response.status === 401) {
         alert('You do not have permission to update entries.');
    }
    throw error;
  }
}

export const deleteEntry = async (entryId) => {
try {
  await axios.delete(`/api/entries/${entryId}`)
} catch (error) {
    if (error.response && error.response.status === 401) {
         alert('You do not have permission to delete entries.');
    }
    throw error;
  }
}
