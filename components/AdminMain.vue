<template>
  <div class="container">
    <p class="text-[20px] text-center">Role: Admin</p>
    <AdminCreateProduct v-model:openModal="openModal" />
    <div class="border-t border-gray-200 mt-8 pt-8">
      <AdminList />
    </div>
  </div>

  <AdminForm :openModal="openModal" ref="modal" />
</template>

<script setup lang="ts">
const openModal = ref<boolean>(false);
  const target = useTemplateRef<HTMLElement>("modal");

  onClickOutside(target, () => {
    openModal.value = false; 
  });

</script>
