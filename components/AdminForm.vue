<template>
  <form
    class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center max-w-[500px] w-full bg-slate-100 px-[40px] py-[30px] rounded-[20px] shadow-lg transition duration-300 ease-in-out"
    :class="openModal ? 'opacity-1 scale-1' : 'opacity-0 scale-0'"
  >
    <div v-for="field in fields" :key="field.name" class="flex flex-col">
      <label class="text-[17px] font-[600] my-[5px]">{{ field.label }}</label>
      <input
        :id="field.name"
        v-model="field.modelValue"
        v-bind="field.attrs"
        :type="field.type"
        :placeholder="field.placeholder"
        class="bg-[white] px-[15px] py-[10px]"
      />
    </div>

    <label for="img" class="mt-[20px] cursor-pointer">
      <div class="flex justify-center px-[20px] py-[4px] bg-[#d90e32]">
        <Icon name="i-mdi-image" class="w-[30px] h-[30px] bg-[white]" />
      </div>
      <input id="img" type="file" class="hidden" />
    </label>
    <NuxtImg />

    <button
      class="px-[20px] py-[8px] bg-[#d90e32] rounded-[10px] text-[18px] text-[white] font-[600] mt-[20px]"
      type="submit"
    >
      Add Product
    </button>
  </form>
</template>

<script setup lang="ts">
import { productSchema } from "~/validation/adminShema";

defineProps<{openModal: boolean}>();

const { handleSubmit, defineField, errors, resetForm } = useForm({
  validationSchema: productSchema,
});

const [name, nameAttrs] = defineField("name");
const [description, descriptionAttrs] = defineField("description");
const [price, priceAttrs] = defineField("price");
const [stock, stockAttrs] = defineField("stock");

const fields = reactive([
  {
    name: "name",
    label: "Product Name",
    attrs: nameAttrs,
    modelValue: name,
    type: "text",
    placeholder: "Enter product name",
  },
  {
    name: "description",
    label: "Description",
    attrs: descriptionAttrs,
    modelValue: description,
    type: "textarea",
    placeholder: "Enter product description",
  },
  {
    name: "price",
    label: "Price",
    attrs: priceAttrs,
    modelValue: price,
    type: "number",
    placeholder: "Enter price",
  },
  {
    name: "stock",
    label: "Stock",
    attrs: stockAttrs,
    modelValue: stock,
    type: "number",
    placeholder: "Enter stock quantity",
  },
]);
</script>
