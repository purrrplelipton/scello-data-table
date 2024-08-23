<script setup lang="ts">
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { PhDotsThreeVertical, PhSquare, PhX } from "@phosphor-icons/vue";
import { useFocusTrap } from "@vueuse/integrations";
import { ref, watch } from "vue";

const moreOptionsWrapper = ref<HTMLDivElement | null>(null);
const showMoreOptions = ref(false);

const { activate, deactivate } = useFocusTrap(moreOptionsWrapper, {
  clickOutsideDeactivates: true,
  onDeactivate() {
    showMoreOptions.value = false;
  },
});

watch(showMoreOptions, (showMoreOptions) => {
  if (showMoreOptions) return activate();
  deactivate();
});
</script>

<template>
  <div
    class="shrink-0 grid gap-7 grid-cols-[auto_1fr_auto] bg-[#F4F2FF] py-3.5 px-5 overflow-y-scroll"
  >
    <div class="flex gap-5 items-center">
      <PhSquare :size="20" weight="bold" />
      <div class="size-4"></div>
    </div>
    <div
      class="grid gap-7 grid-cols-4 items-center tracking-widest uppercase font-semibold text-xs text-[#6E6893] *:w-full"
    >
      <p>name</p>
      <p>user status</p>
      <p>payment status</p>
      <p>amount</p>
    </div>
    <div class="flex gap-5 items-center">
      <div
        aria-hidden="true"
        class="font-medium text-xs p-1 select-none pointer-events-none invisible"
      >
        <span class="p-px">view more</span>
      </div>
      <div ref="moreOptionsWrapper" v-auto-animate>
        <button
          v-auto-animate
          type="button"
          @click="showMoreOptions = !showMoreOptions"
          class="aspect-square grid place-items-center text-xl text-[#8B83BA]"
        >
          <ph-x weight="bold" aria-hidden="true" v-if="showMoreOptions" />
          <ph-dots-three-vertical weight="bold" aria-hidden="true" v-else />
        </button>
        <div
          v-if="showMoreOptions"
          class="absolute top-[calc(100%+4px)] bg-white"
        ></div>
      </div>
    </div>
  </div>
</template>
