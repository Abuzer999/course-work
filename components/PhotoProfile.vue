<template>
  <div
      class="border-[1px] border-[#e4e4e4] rounded-full w-fit overflow-hidden"
    >
      <NuxtImg
        :src="preview || '../public/defaultProfile.svg'"
        class="rounded-[50%] object-cover bg-center bg-cover"
        :class="size"
      />
    </div>
</template>


<script setup lang="ts">

const{ preview } = usePhoto()

interface Props {
  size?: string;
}

defineProps<Props>()

watchEffect(preview)
</script>