<script setup lang="ts">
withDefaults(
  defineProps<{
    status: string;
    type?: "user" | "payment";
  }>(),
  { type: "user" }
);
</script>

<template>
  <div
    class="rounded-full self-start flex gap-1 items-center font-medium px-1.5 capitalize leading-snug"
    :class="{
      'text-[#4A4AFF] bg-[#E6E6F2]': type === 'user' && status === 'active',
      'bg-[#6E6893]/10': type === 'user' && status === 'inactive',
      'text-[#007F00] bg-[#CDFFCD]': type === 'payment' && status === 'paid',
      'text-[#D30000] bg-[#FFE0E0]': type === 'payment' && status === 'overdue',
      'text-[#965E00] bg-[#FFECCC]': type === 'payment' && status === 'unpaid',
    }"
  >
    <i aria-hidden="true" class="size-1.5 bg-current rounded-full"></i>
    <p>
      {{ status }}
    </p>
  </div>
</template>
