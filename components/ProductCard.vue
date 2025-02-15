<template>
  <div>
  
    <NuxtLink :to="`/products/${id}`">
      <NuxtImg v-if="image" :src="image" class="w-[200px] h-[200px]" />
      <h1>{{ name }}</h1>
      <p>{{ description }}</p>
      <span>Price: {{ price }}р</span>
      <span>Stock: {{ stock }}</span>
    </NuxtLink>
    <div>
      <button
        @click="addBasket"
        class="flex items-center gap-[10px] px-[20px] py-[10px] bg-[#8e8ef3] rounded-[10px]"
      >
        
        Buy
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProduct } from "~/types/product";

const props = defineProps<IProduct>();


const addBasket = async() => {
  try {
    const response = await $fetch("/api/basket/basketAdd", {
      method: "POST",
      body: {
        productId: props.id,
        quantity: 1,
      },
    });

    console.log(response);


  } catch(error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

</script>
