<script setup lang="ts">
import { PhInfo } from "@phosphor-icons/vue";

defineProps<{
  expanded_details: Array<{
    id: string;
    date: string;
    activity: string;
    detail: string;
  }>;
}>();
</script>

<template>
  <div class="divide-y *:border-[#D9D5EC]">
    <div
      class="uppercase text-xs font-semibold tracking-widest grid grid-cols-[auto_1fr_auto] gap-7 py-4 px-5 bg-[#F2F0F9]"
    >
      <div aria-hidden="true" class="flex gap-5 items-center invisible">
        <div class="size-5"></div>
        <div class="size-4"></div>
      </div>
      <div class="grid gap-5 grid-cols-[1fr_2fr_3fr] items-center">
        <p>date</p>
        <p>user activity</p>
        <p class="flex gap-1 items-center">
          <span>detail</span>
          <ph-info
            weight="bold"
            aria-hidden="true"
            class="ml-px mb-0.5 text-base text-[#8B83BA]"
          />
        </p>
      </div>
      <div aria-hidden="true" class="flex gap-5 items-center invisible">
        <div
          class="font-medium text-xs p-1 select-none pointer-events-none invisible"
        >
          <span class="p-px">view more</span>
        </div>
        <div class="size-5"></div>
      </div>
    </div>
    <div
      v-if="expanded_details.length < 1"
      class="grid place-items-center py-10 text-[#6E6893] text-base leading-tight font-semibold tracking-widest uppercase"
    >
      <span>no records found</span>
    </div>
    <div
      v-else
      v-for="{ id, date, activity, detail } in expanded_details"
      :key="id"
      class="items-center text-[#25213B] grid grid-cols-[auto_1fr_auto] gap-7 py-4 px-5"
    >
      <div aria-hidden="true" class="flex gap-5 items-center invisible">
        <div class="size-5"></div>
        <div class="size-4"></div>
      </div>
      <div
        class="grid gap-5 grid-cols-[1fr_2fr_3fr] items-center *:max-w-full *:truncate"
      >
        <p class="text-[#6E6893]">{{ date }}</p>
        <p>{{ activity }}</p>
        <p>{{ detail }}</p>
      </div>
      <div aria-hidden="true" class="flex gap-5 items-center invisible">
        <div
          class="font-medium text-xs p-1 select-none pointer-events-none invisible"
        >
          <span class="p-px">view more</span>
        </div>
        <div class="size-5"></div>
      </div>
    </div>
  </div>
</template>
