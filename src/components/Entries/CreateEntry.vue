<template>
  <div class="create-entry">
    <h2>Create Entry</h2>
    <form @submit.prevent="createEntry" class="entry-form">
      <div class="form-group">
        <label for="name">Name:</label>
        <input id="name" type="text" v-model="name" placeholder="Enter name" required class="form-input">
      </div>
      <div class="form-group">
        <label for="image">Image:</label>
        <input id="image" type="file" @change="handleFileUpload" class="form-input">
      </div>
      <button type="submit" class="submit-button">Create</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { defineEmits } from 'vue'
import * as entriesApi from '../../api/entries'

const name = ref('')
const image = ref(null)
const emit = defineEmits(['entryCreated'])

const handleFileUpload = (event) => {
  image.value = event.target.files[0]
}

const createEntry = async () => {
  const formData = new FormData()
  formData.append('name', name.value)
  if (image.value) {
    formData.append('image', image.value)
  }

  await entriesApi.createEntry(formData)
  name.value = ''
  image.value = null
  emit('entryCreated')
}
</script>

<style src="../../styles.css"></style>