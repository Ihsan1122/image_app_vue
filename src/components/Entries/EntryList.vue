<template>
  <div class="entries-list">
    <h2>Your Entries</h2>
    <table class="entries-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Image</th>
          <th>Data Time</th>
          <th v-if="props.permissions.canDeleteEntries">Delete</th>
          <th v-if="props.permissions.canEditEntries">Update</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in entries" :key="entry.id">
          <td>{{ entry.name }}</td>
          <td>
            <img :src="`http://localhost:3333/${entry.image_url}`" class="entry-image" alt="Entry Image">
          </td>
          <td>
            {{ formatDateTime(entry.created_at) }}
          </td>
          <td v-if="props.permissions.canDeleteEntries">
            <button @click="deleteEntry(entry.id)" class="delete-button">Delete</button>
          </td>
          <td v-if="props.permissions.canEditEntries">
            <EditEntry :entry="entry" @entryUpdated="$emit('entryUpdated')" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import * as entriesApi from '../../api/entries'
import EditEntry from './EditEntry.vue'

const props = defineProps({
  entries: Array,
  permissions: Object
})

const emits = defineEmits(['entryUpdated', 'entryDeleted'])

const deleteEntry = async (id) => {
  await entriesApi.deleteEntry(id)
  emits('entryDeleted')
}

const formatDateTime = (dateTime) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      return new Date(dateTime).toLocaleDateString(undefined, options);
    }
</script>

<style src="../../styles.css"></style>