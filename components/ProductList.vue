<template>
  <div class="flex flex-col mb-[80px]">
    <div
      class="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-[40px_40px] mt-[30px]"
    >
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
  </div>

  <Loader
  class="my-[50px]"
    v-if="status === 'pending' && offset > 0"
  />

  <Loader
    v-if="status === 'pending' && offset === 0"
    class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
  />
</template>

<script setup lang="ts">
import type { IProduct, IProductDetail } from "~/types/product";

const products = ref<IProduct[]>([]);
const limit = ref<number>(15);
const offset = ref<number>(0);
const totalProducts = ref<number>(0);

const { data, status, refresh } = await useLazyAsyncData<IProductDetail>(
  "products",
  () =>
    $fetch(`/api/products/products?limit=${limit.value}&offset=${offset.value}`)
);

watch(data, (newData: IProductDetail | null) => {
  if (newData) {
    products.value = [...products.value, ...newData.products];
    totalProducts.value = newData.totalProducts;
  }
});

useInfiniteScroll(
  window,
  async () => {
    offset.value += limit.value;
    await refresh();
    console.log("offset", offset.value);
  },
  {
    distance: 100,
    canLoadMore: () => offset.value < totalProducts.value,
  }
);
</script>
