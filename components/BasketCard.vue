<template>
  <NuxtLink
    v-if="quantity > 0 || !deleteProduct"
    :to="`/products/${productId}`"
    class="relative flex items-center justify-between gap-[30px] px-[20px] py-[18px] border-[1px] border-solid border-[#e4e4e4] bg-[#f1f1f1] h-[185px] shadow-md"
  >
    <div class="flex items-center">
      <div
        class="relative flex items-center justify-center min-w-[250px] min-h-[150px] bg-[#f7f7f7]"
      >
        <NuxtImg
          v-if="image"
          :src="image"
          class="w-[220px] h-[120px] object-contain"
        />
      </div>
      <div class="ml-[50px] w-[160px]">
        <h1 class="text-[25px] font-[700]">{{ name }}</h1>
        <span class="text-[22px] font-[500]">{{ price }}₽</span>
        <p class="text-[18px] font-[500] leading-[100%] mt-[15px]">
          {{ description }}
        </p>
      </div>
    </div>

    <BasketCounter
      @click.prevent="true"
      :quanty="quantity"
      @addProduct="addProduct"
      @removeProduct="removeProduct"
      class="relative z-[100]"
    />

    <span class="text-[25px] font-[500] w-[120px]">{{ totalPrice }}₽</span>

    <Icon
      name="i-material-symbols:delete"
      class="absolute top-[20px] right-[30px] w-[24px] h-[24px]"
      @click.prevent="deleteProduct"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
import type { BasketItem } from "~/types/basket";

const { basketList, totalAmount } = useBasketList();

const props = defineProps<BasketItem>();
const quantity = ref<number>(props.quantity);

const totalPrice = computed(() => quantity.value * props.price);

let lastActionTime = 0;
const debounceDelay = 300;

const addProduct = async (): Promise<void> => {
  const currentTime = Date.now();

  if (currentTime - lastActionTime < debounceDelay) {
    return;
  }

  lastActionTime = currentTime;

  if (quantity.value >= 100) {
    return;
  }

  try {
    const oldTotalPrice = quantity.value * props.price;
    quantity.value += 1;
    const newTotalPrice = quantity.value * props.price;
    totalAmount.value += newTotalPrice - oldTotalPrice;

    const response = await $fetch("/api/basket/basket", {
      method: "POST",
      body: { productId: props.productId, quantity: 1 },
    });

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

const removeProduct = async (): Promise<void> => {
  const currentTime = Date.now();

  if (currentTime - lastActionTime < debounceDelay) {
    return;
  }

  lastActionTime = currentTime;

  if (quantity.value <= 0) {
    return;
  }

  try {
    const oldTotalPrice = quantity.value * props.price;
    quantity.value -= 1;
    const newTotalPrice = quantity.value * props.price;
    totalAmount.value -= oldTotalPrice - newTotalPrice;

    const response = await $fetch("/api/basket/basket", {
      method: "POST",
      body: { productId: props.productId, quantity: -1 },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

const deleteProduct = async (): Promise<void> => {
  try {
    const itemTotalPrice = quantity.value * props.price;
    totalAmount.value -= itemTotalPrice;
    basketList.value = basketList.value.filter(
      (item: BasketItem) => item.productId !== props.productId
    );
    const response = await $fetch("/api/basket/removeItem", {
      method: "DELETE",
      body: { productId: props.productId },
    });
    if (response) {
      quantity.value = 0;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};
</script>
