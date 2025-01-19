<template>
  <button
    class="flex items-center font-weight-[700] text-[17px] line-height-[143%] text-[#ffffff] justify-between w-[384px] px-[16px] py-[14px] bg-[#d90e32] rounded-[10px]"
  >
    <span class="mx-auto">{{ text }}</span>
    <Icon :name="icon" class="w-[24px] h-[24px] bg-[#ffffff]" />
  </button>
</template>

<script setup lang="ts">
interface Props {
  text: string;
  icon: string;
}

defineProps<Props>();
</script>
