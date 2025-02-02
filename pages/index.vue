<script setup lang="ts">
definePageMeta({
  layout: "default",
  middleware: ["auth"],
});
</script>

<template>
  <div>
    <ProductList />
  </div>
</template>
