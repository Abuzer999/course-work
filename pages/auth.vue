<template>
    <AuthForm />
</template>

<script setup lang="ts">
    definePageMeta({
        layout: "custom",
        middleware: ["auth"],
    })
</script> 