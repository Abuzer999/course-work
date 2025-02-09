<template>
  <div>
    <h1>Products</h1>
    
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :id="product.id"
      :name="product.name"
      :description="product.description"
      :price="product.price"
      :stock="product.stock"
    />

    <div class="pagination">
      <button :disabled="offset <= 1" @click="offset -= 1">
        Предыдущая {{ offset }}
      </button>

      <button :disabled="offset * limit >= totalProducts" @click="offset += 1">
        Следующая
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProduct } from "~/types/product";

const nuxtApp = useNuxtApp();
const products = ref<IProduct[]>([]);
const limit = ref<number>(10);
const offset = ref<number>(1);
const totalProducts = ref<number>(0);


const getListProducts = async () => {
  try {
    const cacheKey = `products-${limit.value}-${offset.value}`;
    const skip = (offset.value - 1) * limit.value;

    const { data: dataProducts, refresh } = await useLazyAsyncData(cacheKey, () =>
      $fetch(`/api/products/products?limit=${limit.value}&offset=${skip}`), 
      {
        getCachedData: (key) => {
          const cachedData = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
          if (cachedData) {
            console.log(`✅ Данные загружены из кэша для ключа: ${key}`);
          } else {
            console.log(`❌ Кэш не найден для ключа: ${key}, выполняется новый запрос...`);
          }
          return cachedData;
        },
      }
    );

    if (dataProducts.value) {
      products.value = dataProducts.value.products;
      totalProducts.value = dataProducts.value.totalProducts;
      console.log(products.value.length);
    } else {
      await refresh(); // В случае, если данные не загрузились из кэша
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Ошибка получения товаров:", error.message);
    }
  }
};



watch([limit, offset], getListProducts, { immediate: true });
</script>
