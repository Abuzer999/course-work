<template>
  <form class="flex flex-col" @submit.prevent="SignIn">
    <div class="flex flex-col gap-[24px]">
      <inputForm
        v-model="emailLogin"
        v-bind="emailLoginAttrs"
        type="email"
        placeholder="Enter your email"
        nameValue="i-material-symbols:alternate-email"
        :errorValue="errors.email"
      />
      <inputForm
        v-model="passwordLogin"
        v-bind="passwordLoginAttrs"
        type="password"
        placeholder="Enter your password"
        nameValue="i-material-symbols:lock"
        :errorValue="errors.password"
      />
    </div>

    <span class="text-[red] mt-[10px] text-center">{{ errorMessage }}</span>
    
    <div class="flex flex-col gap-[12px] mt-[36px]">
      <buttonForm text="Sign In" icon="i-material-symbols:exit-to-app-sharp" />
      <buttonForm
        text="Register"
        icon="i-material-symbols:exit-to-app-sharp"
        @click.prevent="emit('toggleLogin')"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { loginSchema } from "~/validation/loginSchema";
const isLoggin = ref<boolean>(false);

const router = useRouter();

const errorMessage = ref<string>("");

const { fetch } = useUserSession();

const emit = defineEmits<{
  (event: "toggleLogin"): void;
}>();

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: loginSchema,
});

const [emailLogin, emailLoginAttrs] = defineField("email", {
  validateOnModelUpdate: false,
});
const [passwordLogin, passwordLoginAttrs] = defineField("password", {
  validateOnModelUpdate: false,
});

const SignIn = handleSubmit(async (values) => {
  if (isLoggin.value) return;
  isLoggin.value = true;
  try {
    const { email, password } = values;

    const response = await $fetch("/api/auth/login", {
      method: "POST",
      body: { email, password },
    });

    await fetch();
    console.log(response);
    router.push("/");
  } catch (error: unknown) {
    if(error.statusCode === 401) {
      errorMessage.value = "Invalid email or password.";
    } else {
      errorMessage.value = "An error occurred during login. Please try again.";
    }
  } finally {
    isLoggin.value = false;
  }
});
</script>
