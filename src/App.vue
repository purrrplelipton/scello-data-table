<script setup lang="ts">
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { createId } from "@paralleldrive/cuid2";
import {
  PhCheckSquare,
  PhDotsThreeVertical,
  PhFunnel,
  PhMagnifyingGlass,
  PhSpinner,
  PhSquare,
} from "@phosphor-icons/vue";
import { onBeforeMount, ref } from "vue";
import FilterButton from "./components/FilterButton.vue";
import TableRow from "./components/TableRow.vue";
import TabSwitch from "./components/TabSwitch.vue";
import { useUsersStore } from "./stores";

const working = ref(false);

onBeforeMount(async () => {
  try {
    working.value = true;
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setUsers(
      [
        {
          name: "Justin Septimus",
          email: "example@email.com",
          isActive: false,
          lastLogin: "",
          status: "paid",
          statusOn: "",
          amount: 200,
          currency: "USD",
        },
      ].map((user) => ({ id: createId(), ...user }))
    );
  } catch (error) {
    console.error("Error loading users:", error);
  } finally {
    working.value = false;
  }
});

const { users, setUsers } = useUsersStore();

const tabs = [
  { label: "All" },
  { label: "Paid" },
  { label: "Unpaid" },
  { label: "Overdue" },
].map((tab) => ({ id: createId(), ...tab }));
const activeTab = ref<string>(tabs[0].id);

const tableFilter_top = [
  { label: "Default" },
  { label: "First Name" },
  { label: "Last Name" },
  { label: "Due Date" },
  { label: "Last Login" },
].map((fltr) => ({ id: createId(), ...fltr }));
const activeTableFilter_top = ref<string>(tableFilter_top[0].id);

const tableFilter_bottom = [
  { label: "All" },
  { label: "Active" },
  { label: "Inactive" },
].map((fltr) => ({ id: createId(), ...fltr }));
const activeTableFilter_bottom = ref<string>(tableFilter_bottom[0].id);

const showFilters = ref(false);
</script>

<template>
  <header class="h-16 flex items-center">
    <h1 class="uppercase font-bold text-[#6E6893] tracking-widest">
      table heading
    </h1>
  </header>
  <div class="mt-2.5 mb-5 flex items-center border-b border-[#C6C2DE]">
    <tab-switch
      v-for="tab in tabs"
      :key="tab.id"
      v-bind="tab"
      :active-tab="activeTab"
      @update:active-tab="activeTab = $event"
    />
  </div>
  <div
    class="grow flex flex-col items-stretch rounded-lg shadow-md bg-white mb-8"
  >
    <template v-if="!working">
      <template v-if="users">
        <p
          v-if="users.length < 1"
          class="my-auto text-base text-center font-medium"
        >
          No user table to display.
        </p>
        <div
          v-else
          class="grow overflow-auto flex flex-col items-stretch divide-y"
        >
          <div class="flex gap-5 items-center py-3.5 px-5">
            <div v-auto-animate>
              <button
                type="button"
                @click="showFilters = !showFilters"
                class="rounded-lg border text-[#8B83BA] border-current flex gap-2.5 p-[0.5625rem] items-center"
              >
                <ph-funnel class="text-xl" />
                <span>Filter</span>
              </button>
              <div
                v-if="showFilters"
                class="absolute top-[calc(100%_+_4px)] z-10 flex flex-col items-stretch rounded-lg border border-[#C6C2DE] p-2.5 bg-white w-56"
              >
                <p
                  class="text-xs m-2.5 text-[#6E6893] tracking-widest uppercase"
                >
                  sort by:
                </p>
                <filter-button
                  v-for="filter in tableFilter_top"
                  :key="filter.id"
                  v-bind="{
                    ...filter,
                    selectedValue: activeTableFilter_top,
                    name: 'tableFilter_top',
                  }"
                  @update:selected-value="activeTableFilter_top = $event"
                />
                <hr class="border-0 h-px bg-[#F2F0F9] my-1" />
                <p
                  class="text-xs m-2.5 mt-0 pt-2.5 text-[#6E6893] tracking-widest uppercase"
                >
                  users:
                </p>
                <filter-button
                  v-for="filter in tableFilter_bottom"
                  :key="filter.id"
                  v-bind="{
                    ...filter,
                    selectedValue: activeTableFilter_bottom,
                    name: 'tableFilter_bottom',
                  }"
                  @update:selected-value="activeTableFilter_bottom = $event"
                />
              </div>
            </div>
            <div class="grow max-w-96 flex items-center relative text-xs">
              <ph-magnifying-glass class="text-xl absolute left-3" />
              <input
                type="search"
                placeholder="Search Users by Name, Email or Date"
                class="grow rounded-lg bg-[#F4F2FF] p-3 pl-[2.625rem]"
              />
            </div>
            <button
              type="button"
              class="ml-auto p-2.5 rounded-lg text-white bg-[#6D5BD0] uppercase text-base leading-tight"
            >
              pay dues
            </button>
          </div>
          <div
            class="grid gap-7 grid-cols-[auto_1fr_auto] bg-[#F4F2FF] py-3.5 px-5"
          >
            <div class="relative text-xl text-[#8B83BA]">
              <input type="checkbox" id="selectAllRows" class="sr-only peer" />
              <label
                for="selectAllRows"
                role="button"
                class="last:*:hidden first:peer-checked:*:hidden last:peer-checked:*:block"
              >
                <ph-square aria-hidden="true" class="" />
                <ph-check-square aria-hidden="true" class="" />
              </label>
            </div>
            <div
              class="flex gap-7 items-center justify-between tracking-widest uppercase font-semibold text-xs text-[#6E6893] *:w-full"
            >
              <p>name</p>
              <p>user status</p>
              <p>payment status</p>
              <p>amount</p>
            </div>
            <div v-auto-animate class="relative">
              <button
                type="button"
                @click=""
                class="aspect-square grid place-items-center text-xl text-[#8B83BA]"
              >
                <ph-dots-three-vertical aria-hidden="true" class="" />
              </button>
              <div v-if="false"></div>
            </div>
          </div>
          <table-row v-for="user in users" :key="user.id" v-bind="user" />
        </div>
      </template>
      <p v-else class="my-auto text-center font-medium text-red-500 text-base">
        Error fetching users.
      </p>
    </template>
    <ph-spinner v-else class="m-auto text-2xl animate-spin" />
  </div>
</template>

<style scoped lang="css">
/*  */
</style>
