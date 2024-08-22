<script setup lang="ts">
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import {
  PhCaretCircleDown,
  PhCheckSquare,
  PhDotsThreeVertical,
  PhSquare,
} from "@phosphor-icons/vue";
import { useFocusTrap } from "@vueuse/integrations";
import { ref, watch } from "vue";

defineProps<{
  id: string;
  name: string;
  email: string;
  user_status: boolean;
  last_login: string;
  payment_status: string;
  amount: number;
  currency: string;
  expanded_details: {
    id: string;
    date: string;
    activity: string;
    detail: string;
  }[];
}>();

const isExpanded = ref(false);

const more_options_wrapper = ref<HTMLDivElement | null>(null);
const show_more_options_wrapper = ref(false);

const { activate, deactivate } = useFocusTrap(more_options_wrapper, {
  clickOutsideDeactivates: true,
  onDeactivate() {
    show_more_options_wrapper.value = false;
  },
});

watch(show_more_options_wrapper, (show_more_options_wrapper) => {
  if (show_more_options_wrapper) {
    activate();
  } else {
    deactivate();
  }
});
</script>

<template>
  <div v-auto-animate>
    <div
      class="grid grid-cols-[auto_1fr_auto] transition px-5"
      :class="{ 'bg-[#F4F2FF]': isExpanded }"
    >
      <div class="flex gap-5 items-center">
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
          <p class="text-[#25213B] font-medium">{{ name }}</p>
          <span>{{ email }}</span>
        </div>
        <div class="">
          <div
            class="rounded-full self-start flex gap-1 items-center font-medium px-1.5 capitalize leading-snug"
            :class="[
              user_status ? 'text-[#4A4AFF] bg-[#E6E6F2]' : 'bg-[#6E6893]/10',
            ]"
          >
            <i aria-hidden="true" class="size-1.5 bg-current rounded-full"></i>
            <p>
              {{ user_status ? "Active" : "Inactive" }}
            </p>
          </div>
          <span>Last login: {{ last_login }}</span>
        </div>
        <div class="">
          <div
            class="rounded-full self-start flex gap-1 items-center font-medium px-1.5 capitalize leading-snug"
            :class="{
              'text-[#007F00] bg-[#CDFFCD]': /^paid$/giu.test(payment_status),
              'text-[#D30000] bg-[#FFE0E0]': /^overdue$/giu.test(
                payment_status
              ),
              'text-[#965E00] bg-[#FFECCC]': /^unpaid$/giu.test(payment_status),
            }"
          >
            <i aria-hidden="true" class="size-1.5 bg-current rounded-full"></i>
            <p>
              {{ payment_status }}
            </p>
          </div>
          <span>{{}}</span>
        </div>
        <div class="">
          <p>{{ amount }}</p>
          <span>{{ currency }}</span>
        </div>
      </div>
      <div class="flex gap-5 items-center">
        <button type="button" @click="" class="font-medium text-xs">
          view more
        </button>
        <div ref="more_options_wrapper" v-auto-animate class="">
          <button
            type="button"
            @click="show_more_options_wrapper = true"
            class="text-xl"
          >
            <ph-dots-three-vertical aria-hidden="true" />
          </button>
          <div
            v-if="false"
            class="absolute top-[calc(100%)] rounded-md p-1.5 [&>button]:rounded [&>button]:text-left flex flex-col items-stretch [&>button]:focus-visible:bg-[#F2F0F9] [&>button]:transition"
          >
            <button type="button">Edit</button>
            <button type="button">View Profile</button>
            <button type="button">Activate User</button>
            <hr class="border-0 h-px bg-[#F2F0F9]" />
            <button type="button">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="isExpanded"
      class="-divide-y"
      :class="{ 'bg-[#F4F2FF]': isExpanded }"
    >
      <div class="uppercase text-xs font-semibold tracking-widest flex p-4">
        <p>date</p>
        <p>user activity</p>
        <p>detail</p>
      </div>
      <div
        v-for="{ id, date, activity, detail } in expanded_details"
        :key="id"
        class="flex items-center text-[#25213B]"
      >
        <p class="text-[#6E6893]">{{ date }}</p>
        <p>{{ activity }}</p>
        <p>{{ detail }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
/*  */
</style>
