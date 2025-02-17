<template>
  <div>
    <button
      @click="addProduct"
      class="w-full flex justify-center items-center gap-[10px] px-[20px] py-[10px] text-[18px] font-[400] text-[#ffffff] bg-[#d90e32] rounded-[10px]"
    >
      {{ !inBasket ? "Add to basket" : "in basket" }}
    </button>
  </div>
</template>


<script setup lang="ts">
defineProps<{ inBasket: boolean }>();

const emit = defineEmits<{
  (event: "addInBasket"): void;
}>();

const addProduct = () => {
  emit("addInBasket");
};
</script>
