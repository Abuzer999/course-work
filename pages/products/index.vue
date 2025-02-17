<template>
    <div class="container">
        <ProductList />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
  middleware: ["auth"],
})
</script>

