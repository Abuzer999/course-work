<template>
    <div class="container">
        <profileContent />
    </div>
</template>


<script setup lang="ts">
definePageMeta({
  layout: "default",
  middleware: ["auth"],
});
</script>