<script setup lang="ts">
import { PhCircle, PhRadioButton } from "@phosphor-icons/vue";

defineProps<{
  selectedValue: string;
  name: string;
  id: string;
  label: string;
}>();

const emit = defineEmits<{
  (e: "update:selectedValue", value: string): void;
}>();
</script>

<template>
  <div class="relative flex items-center">
    <input
      type="radio"
      :name
      :id
      :value="id"
      :checked="selectedValue === id"
      class="sr-only peer"
      @change="({ currentTarget }) => emit('update:selectedValue', (currentTarget as HTMLInputElement).value)"
    />
    <label
      :for="id"
      role="button"
      class="grow leading-none py-1.5 pl-2.5 pr-9 text-[#25213B] rounded-md peer-checked:bg-[#F2F0F9] truncate capitalize"
    >
      {{ label }}
    </label>
    <ph-circle
    weight="bold"
      aria-hidden="true"
      class="text-[#8B83BA] absolute right-2.5 text-base peer-checked:hidden pointer-events-none"
    />
    <ph-radio-button
      weight="fill"
      aria-hidden="true"
      class="text-[#6D5BD0] absolute right-2.5 text-base peer-[:not(:checked)]:hidden pointer-events-none"
    />
  </div>
</template>
