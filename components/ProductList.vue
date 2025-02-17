<template>
  <div class="flex flex-col h-full">
    <div
      class="flex flex-wrap justify-center gap-[30px_40px] mt-[30px]"
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

    <div class="flex justify-end pb-[20px] mt-[30px]">
      <div class="flex gap-[8px] items-end">
        <button
          @click="offset = 1"
          :class="[
            'px-[15px] py-[8px] rounded-[5px] text-[16px] font-[700] ',
            offset === 1
              ? 'bg-[#d90e32] text-white'
              : 'bg-gray-300 text-[#000000]',
          ]"
        >
          1
        </button>

        <span v-if="pages[0] > 2" class="text-[18px] font-[700]">...</span>

        <button
          v-for="page in pages"
          :key="page"
          @click="offset = page"
          :class="[
            'px-[15px] py-[8px] rounded-[5px] text-[16px] font-[700]',
            offset === page
              ? 'bg-[#d90e32] text-white'
              : 'bg-gray-300 text-[#000000]',
          ]"
        >
          {{ page }}
        </button>

        <span
          v-if="pages[pages.length - 1] < totalPages - 1"
          class="text-[18px] font-[700]"
          >...</span
        >

        <button
          v-if="totalPages > 1"
          @click="offset = totalPages"
          :class="[
            'px-[15px] py-[8px] rounded-[5px] text-[16px] font-[700]',
            offset === totalPages
              ? 'bg-[#d90e32] text-white'
              : 'bg-gray-300 text-[#000000]',
          ]"
        >
          {{ totalPages }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProduct } from "~/types/product";
const router = useRouter();
const nuxtApp = useNuxtApp();

const products = ref<IProduct[]>([]);
const limit = ref<number>(10);
const offset = ref<number>(1);
const totalProducts = ref<number>(0);
const totalPages = computed(() => Math.ceil(totalProducts.value / limit.value));

const pages = computed(() => {
  const range: number[] = [];
  if (totalPages.value <= 1) return range;

  const start = Math.max(2, offset.value - 1);
  const end = Math.min(totalPages.value - 1, offset.value + 1);

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  return range;
});

// const goToPage = (page: number) => {
//   offset.value = page; // Обновляем текущий номер страницы
//   router.push(`/products/${page}`); // Переходим на страницу с номером `page`
// };

const getListProducts = async () => {
  try {
    const cacheKey = `products-${limit.value}-${offset.value}`;
    const skip = (offset.value - 1) * limit.value;

    const { data: dataProducts, refresh } = await useAsyncData(
      cacheKey,
      () =>
        $fetch(`/api/products/products?limit=${limit.value}&offset=${skip}`),
      {
        getCachedData: (key) => {
          const cachedData =
            nuxtApp.payload.data[key] || nuxtApp.static.data[key];
          return cachedData;
        },
      }
    );

    if (dataProducts.value) {
      products.value = dataProducts.value.products;
      totalProducts.value = dataProducts.value.totalProducts;
    } else {
      await refresh();
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Ошибка получения товаров:", error.message);
    }
  }
};

watch([limit, offset], getListProducts, { immediate: true });
</script>
