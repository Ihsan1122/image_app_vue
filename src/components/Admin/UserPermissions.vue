<template>
    <td>{{ user.email }}</td>
    <td>
      <input type="checkbox" v-model="permissions.canEditEntries">
    </td>
    <td>
      <input type="checkbox" v-model="permissions.canDeleteEntries">
    </td>
    <td>
      <input type="checkbox" v-model="permissions.canViewAllEntries">
    </td>
    <td>
      <input type="checkbox" v-model="permissions.canViewEntries">
    </td>
    <td>
      <button type="button" class="update-button" @click="updatePermissions">Update</button>
    </td>
</template>

<script setup>
import { ref } from 'vue'
import { defineProps, defineEmits } from 'vue'
import * as adminApi from '../../api/admin'

const props = defineProps({
  user: Object
})

const emits = defineEmits(['permissionsUpdated'])

const permissions = ref({
  canEditEntries: props.user.can_edit_entries === 1,
  canDeleteEntries: props.user.can_delete_entries === 1,
  canViewAllEntries: props.user.can_view_all_entries === 1,
  canViewEntries: props.user.can_view_entries === 1
})

const updatePermissions = async () => {
  await adminApi.updateUserPermissions(props.user.id, permissions.value)
  emits('permissionsUpdated')
}
</script>

<style src="../../styles.css"></style>
