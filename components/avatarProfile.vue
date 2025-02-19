<template>
  <div class="flex flex-col items-center gap-[20px] mt-[20px]">
    <PhotoProfile :preview="preview" size="w-[200px] h-[200px]" />

    <label
      class="cursor-pointer flex justify-center items-center gap-[10px] bg-[#d90e32] px-[20px] py-[10px] rounded-lg text-white font-[700] text-[18px]"
    >
      <input
        type="file"
        class="hidden"
        @input="handleFileInput"
        accept="image/*"
        @change="editAvatar"
      />
      Upload
      <Icon name="i-material-symbols:edit" class="w-[20px] h-[20px]" />
    </label>

  </div>
</template>

<script setup lang="ts">

const { preview } = usePhoto();

const file = ref<File | null>(null);

const handleFileInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input?.files?.length) {
    file.value = input.files[0];
    preview.value = URL.createObjectURL(file.value);
  }
};

const editAvatar = async () => {
  if (!file.value) return;

  try {
    const formData = new FormData();
    formData.append("file", file.value);

    const { url }: { url: string } = await $fetch("/api/profile/upload", {
      method: "POST",
      body: formData,
    });

    if (url) {
      preview.value = url;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

</script>
