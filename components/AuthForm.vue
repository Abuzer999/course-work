<script setup lang="ts">
const isLogin = ref<boolean>(false);

const toggleLogin = () => {
  isLogin.value = !isLogin.value;
};
</script>

<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <transition name="fade-scale">
      <div
        v-if="true"
        class="bg-[#ebebeb] rounded-[20px] px-[60px] py-[40px] shadow-lg"
      >
        <h1 class="mb-[30px] text-[30px] text-center font-[700]">
          {{ isLogin ? "Register" : "Login" }}
        </h1>
        <RegisterForm v-if="isLogin" @toggleLogin="toggleLogin" />
        <LoginForm v-else @toggleLogin="toggleLogin" />
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Вход (появление) */
.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.fade-scale-enter-active {
  transition: all 0.5s ease;
}
.fade-scale-enter-to {
  opacity: 1;
  transform: scale(1);
}

/* Выход (исчезновение) */
.fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
.fade-scale-leave-active {
  transition: all 0.5s ease;
}
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>