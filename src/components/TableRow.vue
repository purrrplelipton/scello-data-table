<script setup lang="ts">
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { PhCaretCircleDown } from "@phosphor-icons/vue";
import { computed, ref } from "vue";
import useStore, { type IUser } from "~/stores";
import Checkbox from "./Checkbox.vue";
import ExpandedDetails from "./ExpandedDetails.vue";
import MoreOptionsMenu from "./MoreOptionsMenu.vue";
import StatusBadge from "./StatusBadge.vue";

const store = useStore();

const props = defineProps<IUser>();

const isExpanded = ref(false);

function onChange({ target }: Event) {
  const { checked, value } = target as HTMLInputElement;
  store.setSelectedRow(checked ? value : null);
}

const selected = computed(() => store.selectedRow === props.id);
</script>

<template>
  <div :class="{ 'bg-[#F4F2FF]': isExpanded }" v-auto-animate>
    <div
      class="grid gap-7 grid-cols-[auto_1fr_auto] px-5 relative before:absolute before:inset-0 before:right-auto before:w-[0.3125rem] before:transition"
      :class="[selected ? 'before:bg-[#6D5BD0]' : 'before:bg-transparent']"
    >
      <div class="flex gap-5 items-center">
        <checkbox
          name="select-row"
          :ariaLabel="`select row with ID ${id}`"
          :id="`select-row_${id}`"
          :checked="store.selectedRow === id"
          @change="onChange"
        />
        <button
          type="button"
          @click="isExpanded = !isExpanded"
          class="aspect-square grid place-items-center text-base"
        >
          <ph-caret-circle-down
            weight="bold"
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
          <status-badge :status="`${user_status ? '' : 'in'}active`" />
          <span class="text-xs font-medium">Last login: {{ last_login }}</span>
        </div>
        <div class="">
          <status-badge type="payment" :status="payment_status" />
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
        <more-options-menu :id />
      </div>
    </div>
    <expanded-details v-if="isExpanded" :expanded_details />
  </div>
</template>
