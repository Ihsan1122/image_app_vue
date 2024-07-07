<template>
  <div>
    <h2>User List</h2>
    <table class="permissions-table">
      <thead>
        <tr>
          <th>Email</th>
          <th>Can Edit Entries</th>
          <th>Can Delete Entries</th>
          <th>Can View All Entries</th>
          <th>Can View Own Entries</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <UserPermissions :user="user" @permissionsUpdated="$emit('permissionsUpdated')" />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import UserPermissions from './UserPermissions.vue'

const props = defineProps({
  users: Array
})

const emits = defineEmits(['permissionsUpdated'])
</script>

<style src="../../styles.css"></style>
