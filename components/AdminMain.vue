<template>
  <div class="container">
    <p class="text-[20px] text-center">Role: Admin</p>
    <AdminCreateProduct @click="openModal = !openModal"/>
    <div class="border-t border-gray-200 mt-8 pt-8"></div>
  </div>

  <AdminForm :openModal="openModal" />
</template>


<script setup lang="ts">
const openModal = ref<boolean>(false)
</script>