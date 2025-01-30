<template>
    <div>
        <h1>{{ name }}</h1>
        <p>{{ description }}</p>
        <span>Price: {{ price }}р</span>
        <span>Stock: {{ stock }}</span>

        <button @click="addToBasket" class="flex items-center gap-[10px] px-[20px] py-[10px] bg-[#8e8ef3] rounded-[10px]">Buy</button>
    </div>
</template>


<script setup lang="ts">
import type { IProduct } from '~/types/product';

const props = defineProps<IProduct>();
const user = ref<string>('')

const addToBasket = async() => {
    try {
        const data = await $fetch('/api/basket/addProduct', {
            method: 'POST',
            body: {
                userId: user.value,
                productId: props.id,
                quantity: 1,
            }
        })

    } catch(error: unknown) {
        if (error instanceof Error) {
            console.error("Ошибка добавления товара в корзину:", error.message);
        }
    }
}
</script>