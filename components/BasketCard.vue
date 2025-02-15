<template>
  <NuxtLink :to="`/products/${productId}`">
    <NuxtImg :src="image" class="w-[200px] h-[200px]" />
    <h1>{{ name }}</h1>
    <span>Quantity: {{ quantity }}</span>
    <span>Total Price: {{ totalPrice }}</span>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { BasketItem } from "~/types/basket";

defineProps<BasketItem>();
</script>
