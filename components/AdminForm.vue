<template>
  <form
    @submit.prevent="onSubmit"
    class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center max-w-[500px] w-full bg-slate-100 px-[40px] py-[30px] rounded-[20px] shadow-lg transition duration-300 ease-in-out"
    :class="openModal ? 'opacity-1 scale-1' : 'opacity-0 scale-0'"
  >
    <div v-for="field in fields" :key="field.name" class="flex flex-col">
      <label class="text-[17px] font-[600] my-[5px]">{{ field.label }}</label>
      <input
        :id="field.name"
        v-model="field.modelValue"
        :type="field.type"
        :placeholder="field.placeholder"
        class="bg-[white] px-[15px] py-[10px] border-[1px] border-solid rounded-[10px]"
      />
    </div>

    <label for="img" class="mt-[20px] cursor-pointer">
      <div class="flex justify-center px-[20px] py-[4px] bg-[#d90e32]">
        <Icon name="i-mdi-image" class="w-[30px] h-[30px] bg-[white]" />
      </div>
      <input
        @input="handleFileUpload"
        @change="edit"
        id="img"
        type="file"
        class="hidden"
        accept="image/*"
      />
    </label>
    <span v-if="error" class="text-red-600">{{ error }}</span>
    <NuxtImg
      v-if="preview"
      :src="preview"
      class="w-[100px] h-[100px] object-cover mt-[20px]"
    />

    <button
      class="px-[20px] py-[8px] bg-[#d90e32] rounded-[10px] text-[18px] text-[white] font-[600] mt-[20px]"
    >
      Add Product
    </button>
  </form>
</template>

<script setup lang="ts">
import { productSchema } from "~/validation/adminShema";

const props = defineProps<{ openModal: boolean }>();

const username = ref<string>("");
const stock = ref<number>(0);
const price = ref<number>(0);
const description = ref<string>("");

const file = ref<File | null>(null);
const preview = ref<string | null>(null);
const error = ref<string>("");

const fields = reactive([
  {
    name: "name",
    label: "Product Name",
    modelValue: username.value,
    type: "text",
    placeholder: "Enter product name",
  },
  {
    name: "description",
    label: "Description",
    modelValue: description.value,
    type: "text",
    placeholder: "Enter product description",
  },
  {
    name: "price",
    label: "Price",
    modelValue: price.value,
    type: "number",
    placeholder: "Enter price",
  },
  {
    name: "stock",
    label: "Stock",
    modelValue: stock.value,
    type: "number",
    placeholder: "Enter stock quantity",
  },
]);

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input?.files?.length) {
    file.value = input.files[0];
    preview.value = URL.createObjectURL(file.value);
  }
};

const edit = () => {
  error.value = "";
};

const onSubmit = async () => {
  if (!file.value) {
    error.value = "Please select an image file.";
    return;
  }

  const formData = new FormData();
  formData.append("file", file.value);
  formData.append("name", username.value);
  formData.append("description", description.value);
  formData.append("price", price.value);
  formData.append("stock", stock.value);

  try {
    const response = await $fetch("/api/admin/product", {
      method: "POST",
      body: formData,
    });

    console.log(response);

    preview.value = null;
    file.value = null;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};
</script>
