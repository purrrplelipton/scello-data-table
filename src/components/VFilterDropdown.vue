<script setup lang="ts">
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { PhCircle, PhFunnel, PhRadioButton } from "@phosphor-icons/vue";
import { useFocusTrap } from "@vueuse/integrations";
import { ref, watch } from "vue";
import useStore, { filter1, filter2 } from "~/stores";

const store = useStore();

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
  <div ref="dropdownWrapper" v-auto-animate>
    <button
      type="button"
      :aria-disabled="!store.users || store.users.length < 1"
      @click="
        () => {
          if (!store.users || store.users.length < 1) return;
          dropdownIsShown = !dropdownIsShown;
        }
      "
      class="aria-disabled:opacity-50 aria-disabled:cursor-default rounded-lg border text-[#25213B] flex gap-2.5 p-[0.5625rem] items-center transition hover:border-[#6D5BD0] outline-none"
      :class="[
        dropdownIsShown
          ? 'shadow-[0_0_3px_#6D5BD0] border-[#6D5BD0]'
          : 'border-[#C6C2DE] focus-visible:border-[#6D5BD0]',
      ]"
    >
      <ph-funnel weight="fill" class="text-xl text-[#8B83BA]" />
      <span>Filter</span>
    </button>
    <div
      v-if="dropdownIsShown"
      class="absolute top-[calc(100%_+_4px)] z-10 flex flex-col items-stretch rounded-lg border border-[#C6C2DE] p-2.5 bg-white w-56 shadow-[0_5px_8px_rgba(0_0_0_/_20%)]"
    >
      <p class="text-xs m-2.5 text-[#6E6893] tracking-widest uppercase">
        sort by:
      </p>
      <div
        v-for="{ value, label } in filter1"
        :key="value"
        class="relative flex items-center"
      >
        <input
          type="radio"
          name="filter1"
          :id="value"
          :value
          :checked="store.selectedFilter1 === value"
          class="sr-only peer"
          @change="({ target }) => {
            store.setSelectedFilter1((target as HTMLInputElement).value);
            dropdownIsShown = false;
          }"
        />
        <label
          :for="value"
          role="button"
          class="grow leading-none py-1.5 pl-2.5 pr-9 text-[#25213B] rounded-md peer-checked:bg-[#F2F0F9] truncate capitalize"
        >
          {{ label }}
        </label>
        <ph-circle
          weight="bold"
          aria-hidden="true"
          class="text-[#8B83BA] absolute right-2.5 text-base peer-checked:hidden pointer-events-none"
        />
        <ph-radio-button
          weight="fill"
          aria-hidden="true"
          class="text-[#6D5BD0] absolute right-2.5 text-base peer-[:not(:checked)]:hidden pointer-events-none"
        />
      </div>
      <p
        class="text-xs mt-1 mb-2.5 pt-3.5 px-2.5 text-[#6E6893] tracking-widest uppercase border-t border-[#F2F0F9]"
      >
        users:
      </p>
      <div
        v-for="{ value, label } in filter2"
        :key="value"
        class="relative flex items-center"
      >
        <input
          type="radio"
          name="filter2"
          :id="value"
          :value
          :checked="store.selectedFilter2 === value"
          class="sr-only peer"
          @change="({ target }) => {
            store.setSelectedFilter2((target as HTMLInputElement).value);
            dropdownIsShown = false;
          }"
        />
        <label
          :for="value"
          role="button"
          class="grow leading-none py-1.5 pl-2.5 pr-9 text-[#25213B] rounded-md peer-checked:bg-[#F2F0F9] truncate capitalize"
        >
          {{ label }}
        </label>
        <ph-circle
          weight="bold"
          aria-hidden="true"
          class="text-[#8B83BA] absolute right-2.5 text-base peer-checked:hidden pointer-events-none"
        />
        <ph-radio-button
          weight="fill"
          aria-hidden="true"
          class="text-[#6D5BD0] absolute right-2.5 text-base peer-[:not(:checked)]:hidden pointer-events-none"
        />
      </div>
    </div>
  </div>
</template>
