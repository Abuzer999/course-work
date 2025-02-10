<template>
    <div>{{ data }}</div>
</template>

<script setup lang="ts">
    const { data, error } = await useFetch("/api/basket/basketList");


</script>