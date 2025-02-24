<template>
  <div v-if="status === 'success'" class="flex flex-col mb-[80px]">
    <div
      ref="el"
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
  <div v-else-if="status === 'pending'" class="text-center text-lg mt-4">
    Загрузка...
  </div>

  <div v-if="loggedIn && session?.user?.role === 'admin'">
    <AdminCreateProduct />
    <AdminCreateButton @click="addModal" class="fixed bottom-[50px] right-[50px] cursor-pointer" />
  </div>
</template>

<script setup lang="ts">
const { loggedIn, session } = useUserSession();
import type { IProduct, IProductDetail } from "~/types/product";

const nuxtApp = useNuxtApp();

const openModal = ref<boolean>(false);
const products = ref<IProduct[]>([]);
const limit = ref<number>(5);
const offset = ref<number>(0);
const totalProducts = ref<number>(0);

const el = useTemplateRef<HTMLElement>("el");

const skip = ref<number>(0);

const { data, status, refresh } = await useLazyAsyncData<IProductDetail>(
  "products",
  () =>
    $fetch(`/api/products/products?limit=${limit.value}&offset=${skip.value}`)
);

watch(data, (newData: IProductDetail | null) => {
  if (newData) {
    products.value.push(...newData.products);
    totalProducts.value = newData.totalProducts;
  }
});

// // 📌 Бесконечный скролл
useInfiniteScroll(
  el,
  async () => {
    offset.value++;
    skip.value = offset.value * limit.value;
    console.log("loading", offset.value, skip.value);

    await refresh();
  },
  {
    distance: 100,
    canLoadMore: () => {
      if (offset.value * limit.value >= totalProducts.value) {
        return false;
      }
      return true;
    },
  }
);
</script>
