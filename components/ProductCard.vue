<template>
  <div class="flex flex-col max-w-[230px] w-full">
    <NuxtLink
      :to="`/products/${id}`"
      class="flex flex-col"
    >
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

    <buttonAddBasket :inBasket="inBasket" @click="loggedIn ? addBasket() : navigateTo('/auth')" class="mt-auto flex justify-center" />
  </div>
</template>

<script setup lang="ts">
const { loggedIn } = useUserSession();
import type { IProduct } from "~/types/product";
const props = defineProps<IProduct>();

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
    console.log(response);
    inBasket.value = true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};
</script>
