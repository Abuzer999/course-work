<script setup lang="ts">
const isLogin = ref<boolean>(false);

const toggleLogin = () => {
  isLogin.value = !isLogin.value;
};
</script>

<template>
    <div>
        <RegisterForm v-if="isLogin" @toggleLogin="toggleLogin" />
        <LoginForm v-else @toggleLogin="toggleLogin"/>
    </div>
</template>