<script setup lang="ts">
import { PhCheckSquare, PhSquare } from "@phosphor-icons/vue";

defineProps<{
  id: string;
  checked: boolean;
  ariaLabel: string;
  name?: string;
}>();

const emit = defineEmits<{
  (e: "change", value: Event): void;
}>();
</script>

<template>
  <div class="relative text-xl text-[#8B83BA]">
    <input
      type="checkbox"
      :name
      :id
      :aria-label
      class="sr-only peer"
      :value="id"
      :checked
      @change="(event) => emit('change', event)"
    />
    <label
      :for="id"
      role="button"
      class="aspect-square grid place-items-center first:*:hidden peer-checked:first:*:block peer-checked:last:*:hidden"
    >
      <ph-check-square color="#6D5BD0" weight="fill" aria-hidden="true" />
      <ph-square weight="bold" aria-hidden="true" />
    </label>
  </div>
</template>
