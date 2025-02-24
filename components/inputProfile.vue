<template>
  <div class="flex flex-col gap-[5px]">
    <label class="text-[18px] font-[600] text-[black]" >{{ name }}</label>
    <div
      class="flex items-center w-[300px] font-weight-[400] text-[17px] line-height-[137%] rounded-[10px] px-[15px] py-[7px] border-[1px] border-solid border-[#000000] bg-[#ffffff]"
      ref='target'
    >
      <input
        :type="type"
        :placeholder="placeholder"
        :value="modelValue || ''"
        @input="handleInput"
        class="w-full pr-[8px] placeholder:text-[#a6a6a7]"
        :class="{ 'text-[#8f8f8f]': inputDisabled }"
        :disabled="inputDisabled"
      />
      <Icon
        name="i-material-symbols:edit"
        class="w-[24px] h-[24px] bg-[#000000] cursor-pointer"
        @click="InputOnClick"
        :style="{ background: inputDisabled ? '#a6a6a7' : '#000000' }"
        
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: string | number | null;
  type: string;
  placeholder: string;
  name: string;
}

const inputDisabled = ref<boolean>(true);

const emit = defineEmits<{
  (event: "update:modelValue", value: string | number): void;
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null;
  if (target) {
    const value =
      target.type === "number" ? Number(target.value) : target.value;
    emit("update:modelValue", value);
  }
};

const target = useTemplateRef<HTMLElement>('target');

onClickOutside(target, () => {
  inputDisabled.value = true
})


const InputOnClick = (): void => {
  inputDisabled.value = !inputDisabled.value;
};

defineProps<Props>();
</script>
