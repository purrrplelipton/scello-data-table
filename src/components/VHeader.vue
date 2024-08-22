<script setup lang="ts">
import { PhArrowsClockwise } from "@phosphor-icons/vue";
import useStore from "~/stores";

const store = useStore();

const emit = defineEmits<{
  (e: "refresh", value: Event): void;
}>();
</script>

<template>
  <header class="shrink-0 h-16 flex items-center">
    <h1 class="uppercase font-bold text-[#6E6893] tracking-widest">
      table heading
    </h1>
    <button
      type="button"
      @click="(event) => emit('refresh', event)"
      :aria-disabled="store.working"
      class="ml-auto text-xl aspect-square grid place-items-center"
      title="Re-Populate table"
    >
      <ph-arrows-clockwise
        weight="bold"
        color="#25213B"
        aria-hidden="true"
        class="pointer-events-none select-none"
        :class="[{ 'animate-spin': store.working }]"
      />
    </button>
  </header>
</template>
