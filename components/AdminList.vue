<template>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-[40px_50px]">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :id="product.id"
      :image="product.image"
      :name="product.name"
      :description="product.description"
      :price="product.price"
      :stock="product.stock"
    />
  </div>
</template>

<script setup lang="ts">
import type { IProduct } from '~/types/product';

const products = ref<IProduct[] | null>([]);


const { data, refresh } = await useFetch('/api/admin/list');


const getProducts = async () => {
    console.log(data)
  await refresh();
  products.value = data.value;
};

watch(() => data.value, getProducts, { immediate: true });

</script>