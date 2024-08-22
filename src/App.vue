<script setup lang="ts">
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { PhSpinner } from "@phosphor-icons/vue";
import { onBeforeMount } from "vue";
import TableRow from "~/components/TableRow.vue";
import VFilterDropdown from "~/components/VFilterDropdown.vue";
import VHeader from "~/components/VHeader.vue";
import VSearchField from "~/components/VSearchField.vue";
import VTableHeader from "~/components/VTableHeader.vue";
import VTabs from "~/components/VTabs.vue";
import users from "~/db.json";
import useStore, { filter1, filter2, type IUser } from "~/stores";

const store = useStore();

function loadUsers() {
  store.startWorking();
  store.setSelectedFilter1(filter1[0].value);
  store.setSelectedFilter2(filter2[0].value);
  store.setFilter3("");
  store.setSelectedAll(false);
  store.setSelectedRows([]);
  store.setUsers(null);
  const load_data = new Promise((resolve) => setTimeout(resolve, 2000));

  load_data
    .then(() => store.setUsers(users as IUser[]))
    .catch(() => console.error("Error loading users."))
    .finally(store.stopWorking);
}

onBeforeMount(loadUsers);
</script>

<template>
  <v-header @refresh="loadUsers" />
  <v-tabs />
  <div
    v-auto-animate
    class="grow overflow-auto flex flex-col items-stretch rounded-lg shadow-[0_0_5px_rgba(0_0_0_/_20%)] bg-white mb-8"
  >
    <div class="flex gap-5 items-center py-3.5 px-5 border-b border-[#D9D5EC]">
      <v-filter-dropdown />
      <v-search-field
        :disabled="!store.users || store.users.length < 1"
        :value="store.filter3"
        @change="({ target }) => store.setFilter3((target as HTMLInputElement).value)"
      />
      <button
        :aria-disabled="!store.users || store.users.length < 1"
        type="button"
        class="aria-disabled:opacity-50 aria-disabled:cursor-default transition ml-auto p-2.5 rounded-lg text-white bg-[#6D5BD0] uppercase text-base leading-tight"
      >
        pay dues
      </button>
    </div>
    <ph-spinner
      v-if="store.working"
      weight="bold"
      class="m-auto text-2xl animate-spin"
    />
    <template v-else>
      <template v-if="store.users">
        <p
          v-if="store.users.length < 1"
          class="my-auto text-base text-center font-medium"
        >
          No user table to display.
        </p>
        <div
          v-else
          class="grow overflow-auto flex flex-col items-stretch divide-y *:border-[#D9D5EC]"
        >
          <v-table-header />
          <div
            v-auto-animate
            class="grow overflow-auto gutter-stable flex flex-col items-stretch divide-y *:border-[#D9D5EC]"
          >
            <table-row
              v-for="user in store.users"
              :key="user.id"
              v-bind="user"
            />
          </div>
        </div>
      </template>
      <p v-else class="my-auto text-center font-medium text-red-500 text-base">
        Error fetching users.
      </p>
    </template>
  </div>
</template>
