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
        text="Sign Up"
        icon="i-material-symbols:exit-to-app-sharp"
        class="bg-[#358bfc]"
      />
      <buttonForm
        text="Login"
        icon="i-material-symbols:exit-to-app-sharp"
        @click.prevent="emit('toggleLogin')"
      />
    </div>

    <span v-if="messageSuccess" class="text-[green] mt-[10px] text-center">{{
      messageSuccess
    }}</span>
    <span v-else class="text-[red] mt-[10px] text-center">{{
      messageError
    }}</span>
  </form>
</template>

<script setup lang="ts">
import { registerSchema } from "~/validation/registerSchema";
const isSubmitting = ref(false);

const emit = defineEmits<{
  (event: "toggleLogin"): void;
}>();

const { messageError, messageSuccess } = useMessage();

const { resetForm, errors, defineField, handleSubmit } = useForm({
  validationSchema: registerSchema,
});

const [name, nameAttrs] = defineField("name");
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");
const [confirmPassword, confirmPasswordAttrs] = defineField("confirmPassword");

const onSumbit = handleSubmit(async (values) => {
  if (isSubmitting.value) return;
  isSubmitting.value = true;

  try {
    const { name, email, password } = values;

    const response = await $fetch("/api/auth/register", {
      method: "POST",
      body: { name, email, password },
    });

    if (response) {
      messageError.value = "";
      resetForm();
      messageSuccess.value = "User successfully registered";
    }
  } catch (error: any) {
    if (error.statusCode === 400) {
      messageError.value = "This email is already registered";
    } else {
      messageError.value =
        "An error occurred during registration. Please try again.";
    }
  } finally {
    isSubmitting.value = false;
  }
});
</script>
