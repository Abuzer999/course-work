<template>
  <button
    class="flex items-center gap-[10px] bg-[#d90e32] px-[10px] py-[10px] rounded-lg"
  >
    <Icon
      name="i-material-symbols:remove-rounded"
      class="w-[25px] h-[25px]"
      @click="removeProduct"
    />
    <span class="font-[700] text-[20px]">{{ quanty }}</span>
    <Icon
      name="i-material-symbols:add-rounded"
      class="w-[25px] h-[25px]"
      @click="addProduct"
    />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{ quanty: number }>();

const emit = defineEmits<{
  (event: "addProduct"): void;
  (event: "removeProduct"): void;
}>();

const addProduct = () => {
  emit("addProduct");
};

const removeProduct = () => {
  emit("removeProduct");
};
</script>
