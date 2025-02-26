<template>
  <div class="flex items-center justify-center mt-[30px]">
    <button
      @click="emit('update:openModal', true)"
      class="text-[18px] font-[500] text-[#ffffff] flex items-center gap-[20px] px-[20px] py-[10px] bg-[#d90e32] rounded-[10px] cursor-pointer"
    >
      <span>Create product</span>
      <Icon
        name="i-material-symbols:add-rounded"
        class="w-[30px] h-[30px] bg-[#ffffff]"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ openModal: boolean }>();
const emit = defineEmits(["update:openModal"]);
</script>
