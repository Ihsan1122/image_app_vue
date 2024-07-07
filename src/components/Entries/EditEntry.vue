<template>
  <div>
    <button @click="showEditPopup = true" class="edit-button">Edit</button>
    <div v-if="showEditPopup" class="edit-popup">
      <div class="edit-popup-content">
        <span @click="closeEditPopup" class="edit-popup-close">&times;</span>
        <h3>Edit Entry</h3>
        <form @submit.prevent="submitEdit" class="form-container">
          <div class="form-group">
            <label for="name" style="text-align: left;">Name:</label>
            <input id="name" type="text" v-model="entryData.name" class="input-field"/>
          </div>
          <div class="form-group">
            <label for="image" style="text-align: left;">Image:</label>
            <input id="image" type="file" @change="onFileChange" class="file-input"/>
          </div>
          <button type="submit" class="save-button">Save</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { defineProps, defineEmits } from 'vue'
import * as entriesApi from '../../api/entries'

const props = defineProps({
  entry: Object
})

const emits = defineEmits(['entryUpdated'])

const showEditPopup = ref(false)
const entryData = ref({ ...props.entry })
const selectedFile = ref(null)

const onFileChange = (event) => {
  selectedFile.value = event.target.files[0]
}

const submitEdit = async () => {
  const formData = new FormData()
  formData.append('name', entryData.value.name)
  if (selectedFile.value) {
    formData.append('image', selectedFile.value)
  }

  await entriesApi.updateEntry(props.entry.id, formData)
  closeEditPopup()
  emits('entryUpdated')
}

const closeEditPopup = () => {
  showEditPopup.value = false
}
</script>
<style src="../../styles.css"></style>