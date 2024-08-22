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
import { useFocusTrap } from "@vueuse/integrations";
import { onBeforeMount, ref, watch } from "vue";
import FilterButton from "./components/FilterButton.vue";
import TableRow from "./components/TableRow.vue";
import TabSwitch from "./components/TabSwitch.vue";
import __users__ from "./db.json";
import { useUsersStore } from "./stores";

const working = ref(false);
const usersStore = useUsersStore();

onBeforeMount(() => {
  working.value = true;
  const load_data = new Promise((resolve) => setTimeout(resolve, 2000));

  load_data
    .then(() => usersStore.setUsers(__users__))
    .catch(() => {
      console.error("Error loading users.");
    })
    .finally(() => {
      working.value = false;
    });
});

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

const filter_dropdown = ref<HTMLDivElement | null>(null);
const show_filter_dropdown = ref(false);

const { activate, deactivate } = useFocusTrap(filter_dropdown, {
  clickOutsideDeactivates: true,
  onDeactivate() {
    show_filter_dropdown.value = false;
  },
});

watch(show_filter_dropdown, (show_filter_dropdown) => {
  if (show_filter_dropdown) {
    activate();
  } else {
    deactivate();
  }
});
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
    class="grow overflow-auto flex flex-col items-stretch rounded-lg shadow-[0_0_5px_rgba(0_0_0_/_20%)] bg-white mb-8 divide-y *:border-[#D9D5EC]"
  >
    <div class="flex gap-5 items-center py-3.5 px-5">
      <div ref="filter_dropdown" v-auto-animate>
        <button
          type="button"
          :aria-disabled="!usersStore.users || usersStore.users.length < 1"
          @click="
            () => {
              if (!usersStore.users || usersStore.users.length < 1) return;
              show_filter_dropdown = true;
            }
          "
          class="aria-disabled:opacity-50 aria-disabled:cursor-default rounded-lg border text-[#25213B] border-[#C6C2DE] flex gap-2.5 p-[0.5625rem] items-center transition hover:border-[#6D5BD0] focus-visible:border-[#6D5BD0] outline-none"
          :class="{ 'shadow-[0_0_3px_#6D5BD0]': show_filter_dropdown }"
        >
          <ph-funnel class="text-xl text-[#8B83BA]" />
          <span>Filter</span>
        </button>
        <div
          v-if="show_filter_dropdown"
          class="absolute top-[calc(100%_+_4px)] z-10 flex flex-col items-stretch rounded-lg border border-[#C6C2DE] p-2.5 bg-white w-56 shadow-[0_5px_8px_rgba(0_0_0_/_20%)]"
        >
          <p class="text-xs m-2.5 text-[#6E6893] tracking-widest uppercase">
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
            @update:selected-value="
              ($event) => {
                show_filter_dropdown = false;
                activeTableFilter_top = $event;
              }
            "
          />
          <p
            class="text-xs mt-1 mb-2.5 pt-3.5 px-2.5 text-[#6E6893] tracking-widest uppercase border-t border-[#F2F0F9]"
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
        <ph-magnifying-glass
          class="text-xl absolute left-3 pointer-events-none"
        />
        <input
          type="search"
          :readonly="!usersStore.users || usersStore.users.length < 1"
          placeholder="Search Users by Name, Email or Date"
          class="aria-readonly:opacity-50 grow rounded-lg bg-[#F4F2FF] p-3 pl-[2.625rem] border border-transparent focus-visible:border-[#6D5BD0] transition outline-none"
        />
      </div>
      <button
        :aria-disabled="!usersStore.users || usersStore.users.length < 1"
        type="button"
        class="aria-disabled:opacity-50 aria-disabled:cursor-default transition ml-auto p-2.5 rounded-lg text-white bg-[#6D5BD0] uppercase text-base leading-tight"
      >
        pay dues
      </button>
    </div>
    <template v-if="!working">
      <template v-if="usersStore.users">
        <p
          v-if="usersStore.users.length < 1"
          class="my-auto text-base text-center font-medium"
        >
          No user table to display.
        </p>
        <div
          v-else
          class="grow overflow-auto flex flex-col items-stretch divide-y *:border-[#D9D5EC]"
        >
          <div
            class="grid gap-7 grid-cols-[auto_1fr_auto] bg-[#F4F2FF] py-3.5 px-5"
          >
            <div class="flex gap-5 items-center">
              <div class="relative text-xl text-[#8B83BA]">
                <input
                  type="checkbox"
                  id="selectAllRows"
                  class="sr-only peer"
                />
                <label
                  for="selectAllRows"
                  role="button"
                  class="last:*:hidden first:peer-checked:*:hidden last:peer-checked:*:block"
                >
                  <ph-square aria-hidden="true" class="" />
                  <ph-check-square aria-hidden="true" class="" />
                </label>
              </div>
              <div class="size-4"></div>
            </div>
            <div
              class="grid gap-7 grid-cols-4 items-center tracking-widest uppercase font-semibold text-xs text-[#6E6893] *:w-full"
            >
              <p>name</p>
              <p>user status</p>
              <p>payment status</p>
              <p>amount</p>
            </div>
            <div class="flex gap-5 items-center">
              <div
                aria-hidden="true"
                class="font-medium text-xs p-1 select-none pointer-events-none invisible"
              >
                <span class="p-px">view more</span>
              </div>
              <div v-auto-animate class="">
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
          </div>
          <div
            class="grow overflow-auto gutter-stable flex flex-col items-stretch divide-y *:border-[#D9D5EC]"
          >
            <table-row
              v-for="user in usersStore.users"
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
    <ph-spinner v-else class="m-auto text-2xl animate-spin" />
  </div>
</template>

<style scoped lang="css">
/*  */
</style>
