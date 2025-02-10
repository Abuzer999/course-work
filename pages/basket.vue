<template>
    <h1>Basket</h1>


    <div>
        <BasketCard />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
  middleware: ["auth"],
})
</script>