<template>
  <div v-if="status === 'success'">
    
    <BasketCard
      v-for="card in basketList"
      :key="card.productId"
      :productId="card.productId"
      :image="card.image"
      :price="card.price"
      :name="card.name"
      :quantity="card.quantity"
      :totalPrice="card.totalPrice"
    />
  </div>
  <div v-else>
    <p>Нет товаров</p>
  </div>
</template>

<script setup lang="ts">
import type { Basket, BasketItem } from "~/types/basket";

const basketList = ref<BasketItem[]>([]);

const { data, error, status } = await useFetch<Basket>(
  "/api/basket/basketList"
);

const getBasketList = async () => {
  try {
    if (data.value) {
      basketList.value = data.value.items;
    }
    if (error.value) {
      console.error(error.value.message);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

onMounted(getBasketList);
</script>
