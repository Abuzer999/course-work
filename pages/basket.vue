<template>
  <div class="container">
    <div class="flex justify-center mt-[60px]">
      <BasketList />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
  middleware: ["auth"],
});
</script>
