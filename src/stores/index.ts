import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUsersStore = defineStore('users', () => {
  const users = ref<{
    id: string;
    name: string;
    email: string;
    user_status: boolean;
    last_login: string;
    payment_status: string;
    amount: number;
    currency: string;
    expanded_details: {
      id: string;
      date: string;
      activity: string;
      detail: string;
    }[];
  }[] | null>(null)
  function setUsers(__users__: typeof users.value) {
    users.value = __users__
  }


  return { users, setUsers }
})
