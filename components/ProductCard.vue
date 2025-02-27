<template>
  <div v-if="!deleteProd" class="relative flex flex-col max-w-[230px] w-full">
    <NuxtLink :to="`/products/${id}`" class="flex flex-col">
      <div
        class="relative flex items-center justify-center w-full h-[230px] bg-[#f7f7f7]"
      >
        <NuxtImg
          v-if="image"
          :src="image"
          class="w-[180px] h-[180px] object-contain"
        />
      </div>
      <h1
        class="text-[20px] font-[700] text-[#000000] ml-[10px] mt-[5px] leading-[100%]"
      >
        {{ name }}
      </h1>
      <p
        class="text-[16px] font-[500] text-[#000000] ml-[10px] mt-[7px] leading-[100%]"
      >
        {{ description }}
      </p>
      <span
        class="text-[16px] font-[500] text-[#000000] ml-[10px] mt-[8px] mb-[10px] leading-[100%]"
        >{{ price }}₽</span
      >
    </NuxtLink>

    <Icon
      @click="deleteProduct"
      v-if="$route.fullPath == '/admin'"
      name="i-mdi-close"
      class="absolute top-[10px] right-[10px] w-[30px] h-[30px] cursor-pointer"
    />

    <buttonAddBasket
      :inBasket="inBasket"
      @click="loggedIn ? addBasket() : navigateTo('/auth')"
      class="mt-auto flex justify-center"
    />
  </div>
</template>

<script setup lang="ts">
const { loggedIn } = useUserSession();
import type { IProduct } from "~/types/product";
const props = defineProps<IProduct>();
const deleteProd = ref<boolean>(false);

const inBasket = ref(false);

const addBasket = async (): Promise<void> => {
  if (inBasket.value) return;
  try {
    const response = await $fetch("/api/basket/basket", {
      method: "POST",
      body: {
        productId: props.id,
        quantity: 1,
      },
    });
    inBasket.value = true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

const deleteProduct = async (): Promise<void> => {
  try {
    const response = await $fetch('/api/admin/item', {
      method: "DELETE",
      body: {
        productId: props.id,
      },
    });
    
    if (response) {
      deleteProd.value = true;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};
</script>
