<template>
  <div class="container">
    <div class="flex justify-between items-center py-[10px]">
      <NuxtLink to='/' class="text-[30px] font-[700]">SportTime</NuxtLink>

      <nav>
        <ul class="flex gap-[20px]">
          <li v-for="link in links" :key="link.href">
            <NuxtLink :to="link.href" class="text-[18px] font-[400]">{{ link.name }}</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
const links = [
  {
    name: "Shop",
    href: "/",
  },
  {
    name: "Trend",
    href: "/",
  },
  {
    name: "Profile",
    href: "/profile",
  },
];
</script>
