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

        <NuxtLink to="/profile">
          <PhotoProfile size="w-[46px] h-[46px]" />
        </NuxtLink>

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
    name: "About us",
    href: "/",
  },
];

const goBasket = () => {
  navigateTo("/basket");
};
</script>
