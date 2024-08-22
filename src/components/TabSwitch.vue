<script setup lang="ts">
defineProps<{
  id: string;
  label: string;
  activeTab: string;
}>();

const emit = defineEmits<{ (e: "update:activeTab", value: string): void }>();
</script>

<template>
  <div class="relative capitalize font-medium">
    <input
      type="radio"
      name="tab-switch"
      :id
      :value="id"
      @change="({ currentTarget }) => emit('update:activeTab', (currentTarget as HTMLInputElement).value)"
      :checked="activeTab === id"
      class="sr-only peer"
      :tabindex="activeTab === id ? 0 : -1"
    />
    <label
      :for="id"
      role="button"
      class="block p-2.5 outline-none outline-offset-0 peer-focus-visible:outline-[#25213B] peer-checked:text-[#25213B] peer-checked:relative peer-checked:before:absolute peer-checked:before:top-full peer-checked:before:inset-x-0 peer-checked:before:-bottom-px peer-checked:before:bg-current"
    >
      {{ label }}
    </label>
  </div>
</template>
