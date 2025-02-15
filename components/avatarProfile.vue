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
        accept="image/*"
      />
      Upload
      <Icon name="i-material-symbols:edit" class="w-[20px] h-[20px]" />
    </label>
  </div>
</template>

<script setup lang="ts">
const { handleFileInput, files } = useFileStorage();
const { preview } = usePhoto(); // Локальный предпросмотр

const fileData = ref<File | null>(null); // Загружаемый файл

// const handleFileInput = async (event: Event) => {
//   const target = event.target as HTMLInputElement;
//   const file = target.files?.[0];

//   if (file) {
//     preview.value = URL.createObjectURL(file); // Показываем превью
//     fileData.value = file;

//     // await uploadFile(file) // Отправляем на сервер
//   }
// };

const submit = async (): Promise<void> => {
  const response = await $fetch("/api/profile/upload", {
    method: "POST",
    body: {
      file: files.value[0],
    },
  });

  if (response) {
    console.log(response);
  }
};
</script>
