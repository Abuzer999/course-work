<template>
  <div>
    <button @click="logout" class="flex items-center gap-[10px] px-[12px] py-[10px] bg-[#8e8ef3] rounded-[10px]">
        <span class="text-[18px] font-[500]">Log Out</span>
        <Icon name="i-material-symbols:exit-to-app-sharp" class="w-[24px] h-[24px] bg-[#000000]" />
    </button>
  </div>
</template>

<script setup lang="ts">
const logout = async () => {
  try {
    const response = await $fetch("/api/auth/logout", {
      method: "POST",
    });
    console.log(response);
    useRouter().push("/auth");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Logout error:", error);
    }
  }
};
</script>
