<template>
  <div class="container">
    <div class="mx-auto p-6 max-w-3xl">
      <h1 class="text-3xl font-semibold text-center mb-6">Карта сайта</h1>
      <ul class="space-y-4">
        <li
          v-for="(link, index) in links"
          :key="index"
          class="bg-white p-4 rounded-lg shadow-md hover:bg-blue-50 transition-colors duration-200"
        >
          <NuxtLink
            :to="link.path"
            class="flex text-lg font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            {{ link.name }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false,
});

const links = ref([
  { name: "Главная", path: "/" },
  { name: "О компании", path: "/about" },
  { name: "Панель администратора", path: "/admin" },
  { name: "Вход / Регистрация", path: "/auth" },
  { name: "Корзина", path: "/basket" },
  { name: "Профиль", path: "/profile" },
]);
</script>
