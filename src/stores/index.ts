import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUsersStore = defineStore('users', () => {
  const users = ref<{ [key: string]: any }[] | null>(null)
  function setUsers(__users__: { [key: string]: any }[] | null) {
    users.value = __users__
  }

  return { users, setUsers }
})
