<script setup lang="ts">
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { PhCheckSquare, PhSquare } from "@phosphor-icons/vue";

defineProps<{
  id: string;
  checked: boolean;
}>();

const emit = defineEmits<{
  (e: "change", value: Event): void;
}>();
</script>

<template>
  <div class="relative text-xl text-[#8B83BA]">
    <input
      type="checkbox"
      :id
      class="sr-only peer"
      :value="id"
      :checked
      @change="(event) => emit('change', event)"
    />
    <label v-auto-animate :for="id" role="button">
      <ph-check-square weight="bold" aria-hidden="true" v-if="checked" />
      <ph-square weight="bold" aria-hidden="true" v-else />
    </label>
  </div>
</template>
