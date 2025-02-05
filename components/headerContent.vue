<template>
  <div class="container">
    <div class="flex items-center justify-between py-[10px]">
      <NuxtLink to="/" class="text-[30px] font-[700]">SportTime</NuxtLink>

      <nav class="flex items-center gap-[20px]">
        <ul class="flex gap-[20px]">
          <li v-for="link in links" :key="link.href">
            <NuxtLink :to="link.href" class="text-[18px] font-[400]">{{
              link.name
            }}</NuxtLink>
          </li>
        </ul>

        <button @click="goBasket" class="flex">
          <Icon
            name="i-material-symbols:shopping-cart-rounded"
            class="w-[24px] h-[24px] bg-[#000000]"
          />
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
const links = [
  {
    name: "Shop",
    href: "/products",
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

const goBasket = () => {
  navigateTo('/basket')
}
</script>
