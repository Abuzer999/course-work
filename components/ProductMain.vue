<template>
  <Loader
    v-if="isLoading"
    class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex min-h-screen flex-col items-center justify-center"
  />
  <div v-else>
    <h1>{{ product?.name }}</h1>
    <p>{{ product?.description }}</p>
    <p>Price: ${{ product?.price }}</p>
    <p>Stock: {{ product?.stock }}</p>
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
  pending: isLoading,

} = await useFetch<IProduct>(`/api/products/${productId}`, {
  key: cacheKey,
  getCachedData: (key) => {
    const cachedData = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    if (cachedData) {
      console.log(`Данные загружены из кэша для ключа: ${key}`);
    } else {
      console.log(`Кэш не найден для ключа: ${key}`);
    }
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
