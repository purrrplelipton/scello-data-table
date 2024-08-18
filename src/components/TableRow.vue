<script setup lang="ts">
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import {
  PhCaretCircleDown,
  PhCheckSquare,
  PhDot,
  PhDotsThreeVertical,
  PhSquare,
} from "@phosphor-icons/vue";
import { defineProps, ref } from "vue";

defineProps<{ [name: string]: any }>();

const isExpanded = ref(false);

const formatDate = (date: string): string => {
  return date;
};
</script>

<template>
  <div v-auto-animate>
    <div
      :class="[
        'grid grid-cols-[auto_1fr_auto] transition px-5',
        { 'bg-[#F4F2FF]': isExpanded },
      ]"
    >
      <div class="flex items-center">
        <div class="relative text-xl text-[#8B83BA]">
          <input type="checkbox" :id="`selectRow_${id}`" class="sr-only peer" />
          <label
            :for="`selectRow_${id}`"
            role="button"
            class="last:*:hidden first:peer-checked:*:hidden last:peer-checked:*:block"
          >
            <ph-square aria-hidden="true" class="" />
            <ph-check-square aria-hidden="true" class="" />
          </label>
        </div>
        <button
          type="button"
          @click="isExpanded = !isExpanded"
          class="aspect-square grid place-items-center"
        >
          <ph-caret-circle-down
            aria-hidden="true"
            :class="['transition', { 'rotate-180': isExpanded }]"
          />
        </button>
      </div>
      <div
        class="flex gap-7 items-center *:w-full *:flex *:flex-col *:items-stretch"
      >
        <div class="">
          <p>{{ name }}</p>
          <span>{{ email }}</span>
        </div>
        <div class="">
          <div
            :class="[
              isActive ? 'text-[#4A4AFF] bg-[#E6E6F2]' : '',
              'rounded-full',
            ]"
          >
            <ph-dot />
            <p>
              {{ `${isActive ? "" : "In"}Active` }}
            </p>
          </div>
          <span>Last login: {{ formatDate(lastLogin) }}</span>
        </div>
        <div class="">
          <div
            :class="[
              'rounded-full self-start flex gap-1 items-center font-medium px-1.5 capitalize leading-snug',
              { 'text-[#007F00] bg-[#CDFFCD]': status === 'paid' },
            ]"
          >
            <i aria-hidden="true" class="size-1.5 bg-current rounded-full"></i>
            <p>
              {{ status }}
            </p>
          </div>
          <span>{{}}</span>
        </div>
        <div class="">
          <p>{{ amount }}</p>
          <span>{{ currency }}</span>
        </div>
      </div>
      <div class="flex items-center">
        <button type="button" @click="" class="">view more</button>
        <button type="button" @click="" class="">
          <ph-dots-three-vertical aria-hidden="true" />
        </button>
      </div>
    </div>
    <div v-if="isExpanded">
      <div></div>
    </div>
  </div>
</template>

<style scoped lang="css">
/*  */
</style>
