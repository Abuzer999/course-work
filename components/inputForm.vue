<template>
  <div class="flex flex-col gap-[5px]">
    <div
      class="flex items-center justify-between w-[384px] px-[16px] py-[12px] border-[1px] border-solid border-[#e4e4e4] rounded-[10px]"
      :class="{ 'border-[#ff0000]': errorValue }"
    >
      <input
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="handleInput"
        class="w-[300px] font-weight-[400] text-[17px] line-height-[137%] placeholder:text-[#a6a6a7]"
      />
      <Icon :name="nameValue" class="w-[24px] h-[24px] bg-[#a6a6a7]" />
    </div>
    <span
      v-if="errorValue"
      class="text-[#ff0000] text-[13px] font-weight-[400] ml-[3px]"
    >
      {{ errorValue }}
    </span>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: string | undefined;
  type: string;
  placeholder: string;
  nameValue: string;
  errorValue?: string;
}

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null;
  if (target) {
    emit("update:modelValue", target.value);
  }
};

defineProps<Props>();
</script>
