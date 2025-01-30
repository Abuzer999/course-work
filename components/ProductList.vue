<template>
  <div>
    <h1>Products</h1>
    <div v-if="products && products.length === 0">No products available</div>
    <ProductCard
      v-else
      v-for="product in products"
      :key="product.id"
      :id="product.id"
      :name="product.name"
      :description="product.description"
      :price="product.price"
      :stock="product.stock"
    />

    <div class="pagination">
      <button :disabled="offset <= 1" @click="offset -= 1">Предыдущая {{ offset }}</button>

      <button :disabled="offset * limit >= totalProducts" @click="offset += 1">
        Следующая
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProduct } from "~/types/product";
const products = ref<IProduct[]>([]);
const limit = ref(10);
const offset = ref(1);
const totalProducts = ref(0);

const getListProducts = async () => {
  try {
    const skip = (offset.value - 1) * limit.value;
    const data: { products: IProduct[]; totalProducts: number } = await $fetch(`/api/products/product?limit=${limit.value}&offset=${skip}`);
    products.value = data.products;
    totalProducts.value = data.totalProducts;
    console.log(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Ошибка получения товаров:", error);
    }
  }
};

watch([limit, offset], getListProducts, { immediate: true });
</script>
