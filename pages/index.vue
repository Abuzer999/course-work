<script setup lang="ts">
definePageMeta({
  layout: "default",
});
const logout = async () => {
  try {
    const response = await $fetch("/api/auth/logout", {
      method: "POST",
    });
    console.log(response);
    useRouter().push("/auth");
  } catch (error) {
    console.error("Logout error:", error);
  }
};
</script>

<template>
  <div class="w-[100px] h-[100px]">
    <button @click="logout">Log Out</button>
  </div>
</template>
