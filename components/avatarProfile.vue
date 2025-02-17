<template>
  <div class="flex flex-col items-center gap-[20px] mt-[20px]">
    <PhotoProfile :preview="preview" size="w-[200px] h-[200px]" />

    <!-- Кастомная кнопка загрузки -->
    <label
      class="cursor-pointer flex justify-center items-center gap-[10px] bg-[#d90e32] px-[20px] py-[10px] rounded-lg text-white font-[700] text-[18px]"
    >
      <input
        type="file"
        class="hidden"
        @input="handleFileInput"
        accept="image/*"
      />
      Upload
      <Icon name="i-material-symbols:edit" class="w-[20px] h-[20px]" />
    </label>
  </div>
  <div>
  </div>
</template>

<script setup lang="ts">
const { handleFileInput, files } = useFileStorage();
const { preview } = usePhoto();

</script>