<template>
    <div class="container">
        <ProductMain class="mt-[50px]"/>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
  middleware: ["auth"],
})
</script>