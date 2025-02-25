<template>
  <div class="bg-gray-100 py-8">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap justify-between">
        <div class="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 class="text-xl font-semibold mb-4">SportTime</h3>
          <p class="text-gray-600">
            Your one-stop shop for all your sporting needs.
          </p>
        </div>
        <div class="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 class="text-xl font-semibold mb-4">Quick Links</h3>
          <ul>
            <li v-for="link in links" :key="link.href" class="mb-2">
              <NuxtLink
                :to="link.href"
                class="text-gray-600 hover:text-[#d90e32]"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="w-full md:w-1/3">
          <h3 class="text-xl font-semibold mb-4">Contact Us</h3>
          <p class="text-gray-600 mb-2">Email: info@sporttime.com</p>
          <p class="text-gray-600 mb-2">Phone: (123) 456-7890</p>
          <div class="flex space-x-4 mt-4">
            <a href="#" class="text-gray-600 hover:text-[#d90e32]">
              <Icon name="i-mdi-facebook" class="w-6 h-6" />
            </a>
            <a href="#" class="text-gray-600 hover:text-[#d90e32]">
              <Icon name="i-mdi-twitter" class="w-6 h-6" />
            </a>
            <a href="#" class="text-gray-600 hover:text-[#d90e32]">
              <Icon name="i-mdi-instagram" class="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      <div class="mt-8 pt-8 border-t border-gray-200 text-center">
        <p class="text-gray-600">
          &copy; {{ new Date().getFullYear() }} SportTime. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Shop",
    href: "/products",
  },
  {
    name: "About Us",
    href: "/about",
  },
];
</script>
