<template>
  <div class="wrapper">
    <header class="absolute top-0 left-0 w-full px-[20px] py-[15px]">
      <div class="container">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="text-[30px] font-[700]">SportTime</NuxtLink>

          <nav class="flex items-center gap-[20px]">
            <ul class="flex gap-[20px]">
              <li v-for="link in links" :key="link.href">
                <NuxtLink :to="link.href" class="text-[18px] font-[400]">{{
                  link.name
                }}</NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const links = [
  { href: "/", name: "Home" },
  { href: "about", name: "About" },
  { href: "/products", name: "Products" },
  { href: "/auth", name: "Sign in" },
];
</script>
