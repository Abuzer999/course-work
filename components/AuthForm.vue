<script setup lang="ts">
const isLogin = ref<boolean>(false);

const toggleLogin = () => {
  isLogin.value = !isLogin.value;
};
</script>

<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div class="bg-[#ebebeb] rounded-[20px] px-[60px] py-[40px]">
      <h1 class="mb-[30px] text-[30px] text-center font-[700]">{{ isLogin ? "Register" : "Login" }}</h1>
      <RegisterForm v-if="isLogin" @toggleLogin="toggleLogin" />
      <LoginForm v-else @toggleLogin="toggleLogin" />
    </div>
  </div>
</template>
