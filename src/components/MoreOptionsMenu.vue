<script setup lang="ts">
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { PhDotsThreeVertical, PhX } from "@phosphor-icons/vue";
import { useFocusTrap } from "@vueuse/integrations";
import { ref, watch } from "vue";

defineProps<{
  id: string;
}>();

const emit = defineEmits<{
  (e: "delete", id: string): void;
}>();

const dropdownWrapper = ref<HTMLDivElement | null>(null);
const dropdownIsShown = ref(false);

const { activate, deactivate } = useFocusTrap(dropdownWrapper, {
  clickOutsideDeactivates: true,
  onDeactivate() {
    dropdownIsShown.value = false;
  },
});

watch(dropdownIsShown, (dropdownIsShown) => {
  if (dropdownIsShown) return activate();
  deactivate();
});
</script>

<template>
  <div
    ref="dropdownWrapper"
    v-auto-animate
    class="aspect-square grid place-items-center"
  >
    <button
      v-auto-animate
      type="button"
      @click="dropdownIsShown = !dropdownIsShown"
      class="text-xl"
    >
      <ph-x weight="bold" aria-hidden="true" v-if="dropdownIsShown" />
      <ph-dots-three-vertical weight="bold" aria-hidden="true" v-else />
    </button>
    <div
      v-if="dropdownIsShown"
      class="shadow-[0_5px_15px_rgba(0_0_0_/_20%)] absolute top-[calc(100%+4px)] right-0 z-10 bg-white w-40 rounded-md p-1.5 [&>button]:rounded [&>button]:text-left flex flex-col items-stretch hover:[&>button]:bg-[#F2F0F9] focus-visible:[&>button]:bg-[#F2F0F9] [&>button]:transition [&>button]:py-1 [&>button]:px-1.5 [&>button]:outline-none"
    >
      <button type="button" @click="">Edit</button>
      <button type="button" @click="">View Profile</button>
      <button
        type="button"
        @click=""
        class="hover:!bg-green-100 focus-visible:!bg-green-100 !text-green-600"
      >
        Activate User
      </button>
      <hr class="border-0 h-px bg-[#F2F0F9] my-1" />
      <button
        type="button"
        @click="
          () => {
            dropdownIsShown = false;
            emit('delete', id);
          }
        "
        class="hover:!bg-red-100 focus-visible:!bg-red-100 !text-red-600"
      >
        Delete
      </button>
    </div>
  </div>
</template>
