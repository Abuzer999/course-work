<template>
    <div>
        <AdminMain />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "default",
    middleware: ["admin", "auth"],
})
</script>