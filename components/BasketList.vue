<template>
  <div v-if="status === 'success' || totalAmount > 0">
    <div
      v-if="totalAmount > 0"
      class="max-w-[900px] w-full flex flex-col gap-[20px]"
    >
      <BasketCard
        v-for="card in basketList"
        :key="card.productId"
        :productId="card.productId"
        :image="card.image"
        :price="card.price"
        :name="card.name"
        :description="card.description"
        :quantity="card.quantity"
        :totalPrice="card.totalPrice"
      />

      <div class="text-[40px] font-[600] text-right mb-[30px]">
        TOTAL: {{ totalAmount }}₽
      </div>
    </div>

    <Teleport to="body" v-else>
      <p
        class="flex items-center justify-center mt-[100px] text-[30px] font-[600]"
      >
        Products not found
      </p>
    </Teleport>
  </div>
  <div v-else></div>
</template>

<script setup lang="ts">
import type { Basket } from "~/types/basket";

const { basketList, totalAmount } = useBasketList();

const { data, error, status } = await useFetch<Basket>(
  "/api/basket/basketList"
);
const getBasketList = async () => {
  try {
    if (data.value) {
      console.log(data.value);
      basketList.value = data.value.items;
      totalAmount.value = data.value.totalAmount;
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

watch(() => status.value, getBasketList, { immediate: true });
</script>
