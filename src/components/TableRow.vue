<script setup lang="ts">
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import {
  PhCaretCircleDown,
  PhCheckSquare,
  PhDotsThreeVertical,
  PhInfo,
  PhSquare,
  PhX,
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
  <div
    class="transition divide-y *:border-[#D9D5EC]"
    :class="{ 'bg-[#F4F2FF]': isExpanded }"
    v-auto-animate
  >
    <div class="grid gap-7 grid-cols-[auto_1fr_auto] px-5">
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
          class="aspect-square grid place-items-center text-base"
        >
          <ph-caret-circle-down
            aria-hidden="true"
            :class="['transition', { 'rotate-180': isExpanded }]"
          />
        </button>
      </div>
      <div
        class="grid gap-7 grid-cols-4 items-center *:flex *:flex-col *:items-stretch *:justify-between *:size-full py-3"
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
          <span class="text-xs font-medium">Last login: {{ last_login }}</span>
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
        <div class="text-xs tracking-widest">
          <p class="text-[#25213B] font-medium tracking-normal">{{ amount }}</p>
          <span>{{ currency }}</span>
        </div>
      </div>
      <div class="flex gap-5 items-center">
        <button
          type="button"
          @click=""
          class="font-medium text-xs p-1 rounded focus-visible:bg-[#F2F0F9] transition hover:bg-[#F2F0F9] focus-visible:text-[#6D5BD0] hover:text-[#6D5BD0] outline-none"
        >
          <span class="p-px">view more</span>
        </button>
        <div
          ref="more_options_wrapper"
          v-auto-animate
          class="aspect-square grid place-items-center"
        >
          <button
            v-auto-animate
            type="button"
            @click="show_more_options_wrapper = !show_more_options_wrapper"
            class="text-xl"
          >
            <ph-x aria-hidden="true" v-if="show_more_options_wrapper" />
            <ph-dots-three-vertical aria-hidden="true" v-else />
          </button>
          <div
            v-if="show_more_options_wrapper"
            class="shadow-[0_5px_15px_rgba(0_0_0_/_20%)] absolute top-[calc(100%+4px)] right-0 z-10 bg-white w-40 rounded-md p-1.5 [&>button]:rounded [&>button]:text-left flex flex-col items-stretch hover:[&>button]:bg-[#F2F0F9] focus-visible:[&>button]:bg-[#F2F0F9] [&>button]:transition [&>button]:py-1 [&>button]:px-1.5 [&>button]:outline-none"
          >
            <button type="button">Edit</button>
            <button type="button">View Profile</button>
            <button
              type="button"
              class="hover:!bg-green-100 focus-visible:!bg-green-100 !text-green-600"
            >
              Activate User
            </button>
            <hr class="border-0 h-px bg-[#F2F0F9] my-1" />
            <button
              type="button"
              class="hover:!bg-red-100 focus-visible:!bg-red-100 !text-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="isExpanded"
      class="divide-y *:border-[#D9D5EC]"
      :class="{ 'bg-[#F4F2FF]': isExpanded }"
    >
      <div
        class="uppercase text-xs font-semibold tracking-widest grid grid-cols-[auto_1fr_auto] gap-7 py-4 px-5"
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
  </div>
</template>

<style scoped lang="css">
/*  */
</style>
