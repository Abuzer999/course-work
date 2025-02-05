<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else>
    <h1>{{ product?.name }}</h1>
    <p>{{ product?.description }}</p>
    <p>Price: ${{ product?.price }}</p>
    <p>Stock: {{ product?.stock }}</p>
  </div>
</template>

<script setup lang="ts">
import type { IProduct } from "~/types/product";

const error = ref<string>(""); // ошибка
const product = ref<IProduct | null>(null); // данные товара
const isLoading = ref<boolean>(true); // состояние загрузки
const route = useRoute(); // получение параметров маршрута
const productId = route.params.id; // ID товара

const nuxtApp = useNuxtApp();
const cacheKey = `product-${productId}`;

// Использование useFetch для получения данных с кэшированием
const { data: productData, error: errorProduct, refresh } = await useFetch<IProduct>(
  `/api/products/${productId}`,
  {
    key: cacheKey,
    // Кэширование данных
    getCachedData: (key) => {
      const cachedData = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
      if (cachedData) {
        console.log(`Данные загружены из кэша для ключа: ${key}`);
      } else {
        console.log(`Кэш не найден для ключа: ${key}`);
      }
      return cachedData;
    },
  }
);

// Функция для обработки данных
const getProduct = async() => {
  try {
    if (errorProduct.value) {
      throw new Error(errorProduct.value.message); // обработка ошибки
    }

    if (productData.value) {
      product.value = productData.value; // если данные получены — сохраняем в состояние
    } else {
      await refresh();
      error.value = "Товар не найден"; // если товара нет — выводим ошибку
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message); // вывод ошибки в консоль
    }
  } finally {
    isLoading.value = false; // завершение загрузки
  }
};

onMounted(getProduct); // вызов при монтировании
</script>
