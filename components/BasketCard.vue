<template>
  <div>
    <NuxtLink :to="`/products/${productId}`">
      <NuxtImg v-if="image" :src="image" class="w-[200px] h-[200px]" />
      <h1>{{ name }}</h1>
      <span>Price: {{ price }}р</span>
      <span>Total Price: {{ totalPrice }}</span>
    </NuxtLink>

    <BasketCounter
      :quanty="quantity"
      @addProduct="addProduct"
      @removeProduct="removeProduct"
    />
  </div>
</template>

<script setup lang="ts">
import type { BasketItem } from "~/types/basket";

const props = defineProps<BasketItem>();
const quantity = ref<number>(props.quantity);

const totalPrice = computed(() => quantity.value * props.price);


let lastActionTime = 0;
const debounceDelay = 300; 


const addProduct = async (): Promise<void> => {
  const currentTime = Date.now();
  
  if (currentTime - lastActionTime < debounceDelay) {
    console.log("Too fast! Try again later.");
    return;
  }

  lastActionTime = currentTime;

  if (quantity.value >= 100) {
    console.error("Cannot add more than 100 items.");
    return;
  }

  try {
    quantity.value += 1;
    const response = await $fetch("/api/basket/basket", {
      method: "POST",
      body: { productId: props.productId, quantity: 1 },
    });
    console.log(response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

const removeProduct = async (): Promise<void> => {
  const currentTime = Date.now();
  
  if (currentTime - lastActionTime < debounceDelay) {
    console.log("Too fast! Try again later.");
    return;
  }

  lastActionTime = currentTime;

  if (quantity.value <= 0) {
    return;
  }

  try {
    quantity.value -= 1;
    const response = await $fetch("/api/basket/basket", {
      method: "POST",
      body: { productId: props.productId, quantity: -1 },
    });
    console.log(response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

</script>