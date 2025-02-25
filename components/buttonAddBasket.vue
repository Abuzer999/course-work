<template>
  <div>
    <button
      @click="inBasket = !inBasket"
      :disabled="inBasket"
      class="w-full flex justify-center items-center gap-[10px] px-[20px] py-[10px] text-[18px] font-[400] text-[#ffffff] bg-[#d90e32] rounded-[10px]"
    >
      {{ !inBasket ? "Add to basket" : "Product added" }}
    </button>
  </div>
</template>


<script setup lang="ts">
defineProps<{ inBasket: boolean }>();

const inBasket = ref<boolean>(false);

</script>
