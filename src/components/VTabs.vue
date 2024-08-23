<script setup lang="ts">
import useStore, { tabs } from "~/stores";

const store = useStore();
</script>

<template>
  <div class="mt-2.5 mb-5 flex items-center border-b border-[#C6C2DE]">
    <div
      v-for="{ value, label } in tabs"
      :key="value"
      class="relative capitalize font-medium"
    >
      <input
        type="radio"
        name="tab-switch"
        :id="value"
        :value
        @change="({ target }) => store.setActiveTab((target as HTMLInputElement).value)"
        :checked="store.activeTab === value"
        class="sr-only peer"
        :tabindex="store.activeTab === value ? 0 : -1"
      />
      <label
        :for="value"
        role="button"
        class="block p-2.5 outline-none outline-offset-0 peer-focus-visible:outline-[#25213B] peer-checked:text-[#25213B] peer-checked:relative peer-checked:before:absolute peer-checked:before:top-full peer-checked:before:inset-x-0 peer-checked:before:-bottom-px peer-checked:before:bg-current"
      >
        {{ label }}
      </label>
    </div>
    <p class="ml-auto *:not-italic">
      Total payable amount: <i>{{}}</i> <i>{{}}</i>
    </p>
  </div>
</template>
