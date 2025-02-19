<template>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue || ''"
      @input="handleInput"
      class="w-[300px] font-weight-[400] text-[17px] line-height-[137%] placeholder:text-[#a6a6a7]"
    />
  </template>
  
  <script lang="ts" setup>
  interface Props {
    modelValue: string | number | null; 
    type: string; 
    placeholder: string;
  }
  
  const emit = defineEmits<{
    (event: "update:modelValue", value: string | number): void; 
  }>();
  
  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement | null;
    if (target) {
      const value = target.type === 'number' ? Number(target.value) : target.value;
      emit("update:modelValue", value);
    }
  };
  
  defineProps<Props>();
  </script>