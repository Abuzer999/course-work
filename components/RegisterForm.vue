<template>
  <form class="flex flex-col" @submit.prevent="onSumbit">
    <div class="flex flex-col gap-[24px]">
      <inputForm
        v-model="name"
        v-bind="nameAttrs"
        type="text"
        placeholder="Enter your name"
        nameValue="i-material-symbols:person-outline-rounded"
        :errorValue="errors.name"
      />
      <inputForm
        v-model="email"
        v-bind="emailAttrs"
        type="email"
        placeholder="Enter your email"
        nameValue="i-material-symbols:alternate-email"
        :errorValue="errors.email"
      />
      <inputForm
        v-model="password"
        v-bind="passwordAttrs"
        type="password"
        placeholder="Create a password"
        nameValue="i-material-symbols:lock"
        :errorValue="errors.password"
      />
      <inputForm
        v-model="confirmPassword"
        v-bind="confirmPasswordAttrs"
        type="password"
        placeholder="Confirm your password"
        nameValue="i-material-symbols:lock-reset-sharp"
        :errorValue="errors.confirmPassword"
      />
    </div>

    <div class="flex flex-col gap-[12px] mt-[36px]">
      <buttonForm
        text="Sign In"
        icon="i-material-symbols:exit-to-app-sharp"
        class="bg-[#358bfc]"
      />
      <buttonForm
        text="Login"
        icon="i-material-symbols:exit-to-app-sharp"
        @click.prevent="emit('toggleLogin')"
      />
    </div>

    <span class="text-[green]">{{ successMessage }}</span>
  </form>
</template>

<script setup lang="ts">
import { registerSchema } from "~/validation/registerSchema";
const isSubmitting = ref(false);
const router = useRouter();

const emit = defineEmits<{
  (event: "toggleLogin"): void;
}>();

const successMessage = ref<string>("");

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: registerSchema,
});

const [name, nameAttrs] = defineField("name");
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");
const [confirmPassword, confirmPasswordAttrs] = defineField("confirmPassword");

const onSumbit = handleSubmit(async (values) => {
  if(isSubmitting.value) return;
  isSubmitting.value = true;

  try {
    const { name, email, password } = values;

    const response = await $fetch("/api/auth/register", {
      method: "POST",
      body: { name, email, password },
    });

    console.log(response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }finally {
    isSubmitting.value = false;
  }
});
</script>
