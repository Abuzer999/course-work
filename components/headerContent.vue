<template>
  <div class="container">
    <div class="relative">
      <div
        class="flex items-center justify-between px-[20px] py-[15px] w-full"
        :class="
          router.currentRoute.value.path === '/auth'
            ? 'absolute top-0 left-0'
            : ''
        "
      >
        <NuxtLink to="/" class="text-[30px] font-[700]">SportTime</NuxtLink>

        <nav class="flex items-center gap-[20px]">
          <ul class="flex gap-[20px]">
            <li v-for="link in links" :key="link.href">
              <NuxtLink :to="link.href" class="text-[18px] font-[400]">{{
                link.name
              }}</NuxtLink>
            </li>
          </ul>

          <NuxtLink v-if="loggedIn" to="/profile">
            <PhotoProfile size="w-[46px] h-[46px]" />
          </NuxtLink>

          <button v-if="loggedIn" @click="goBasket" class="flex">
            <Icon
              name="i-material-symbols:shopping-cart-rounded"
              class="w-[24px] h-[24px] bg-[#000000]"
            />
          </button>
          <button
            v-else
            @click="router.push('/auth')"
            class="flex text-[18px] text-[#ffffff] font-[400] bg-[#d90e32] px-[12px] py-[10px] rounded-[10px]"
          >
            Sign in
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const { loggedIn } = useUserSession();

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
