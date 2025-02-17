<template>
  <div class="grid grid-cols-[500px_600px] justify-center gap-[80px]">
    <div
      class="flex items-center justify-center w-full px-[50px] h-[500px] py-[50px] bg-[#f7f7f7]"
    >
      <NuxtImg
        v-if="product?.image"
        :src="product?.image"
        class="w-full h-full object-contain"
      />
    </div>
    <div>
      <h1 class="text-[45px] font-[700] leading-[100%]">{{ product?.name }}</h1>
      <p class="text-[22px] font-[500] leading-[100%] mt-[15px]">{{ product?.description }}</p>
      <p class="text-[20px] font-[500] leading-[100%] mt-[15px]">{{ product?.price }} ₽</p>
      <p class="text-[20px] font-[500] leading-[100%] mt-[15px]">Stock: {{ product?.stock }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProduct } from "~/types/product";

const product = ref<IProduct | null>(null);
const route = useRoute();
const productId = route.params.id;

const nuxtApp = useNuxtApp();
const cacheKey = `product-${productId}`;

const {
  data: productData,
  error,
  refresh,
} = await useFetch<IProduct>(`/api/products/${productId}`, {
  key: cacheKey,
  getCachedData: (key) => {
    const cachedData = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    return cachedData;
  },
});

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Product not found",
  });
}

const getProduct = async () => {
  try {
    if (productData.value) {
      product.value = productData.value;
    } else {
      await refresh();
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

onMounted(getProduct);
</script>
