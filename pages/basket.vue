<template>
    <h1>Basket</h1>


    <div>
        <BasketList />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
  middleware: ["auth"],
})
</script>