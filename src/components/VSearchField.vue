<script setup lang="ts">
import { PhMagnifyingGlass } from "@phosphor-icons/vue";

defineProps<{
  value: string;
  disabled: boolean;
}>();

const emit = defineEmits<{
  (e: "change", value: Event): void;
}>();
</script>

<template>
  <div class="grow max-w-96 flex items-center relative text-xs">
    <ph-magnifying-glass
      weight="bold"
      class="text-xl absolute left-3 pointer-events-none"
    />
    <input
      type="search"
      :value
      @change="(event) => emit('change', event)"
      :readonly="disabled"
      placeholder="Search Users by Name, Email or Date"
      class="aria-readonly:opacity-50 grow rounded-lg bg-[#F4F2FF] p-3 pl-[2.625rem] border border-transparent focus-visible:border-[#6D5BD0] transition outline-none"
    />
  </div>
</template>
