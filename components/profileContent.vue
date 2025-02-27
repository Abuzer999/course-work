<template>
  <div>
    <form class="w-full flex flex-col items-center">
      <avatarProfile />

      <div
        class="max-w-[1200px] w-full flex justify-between bg-[#f5f4f4] p-[20px] rounded-[10px] mt-[60px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
      >
        <inputProfile
          v-model="dataUser.name"
          type="text"
          placeholder="Name"
          name="Name"
        />
        <inputProfile
          v-model="dataUser.email"
          type="email"
          placeholder="Email"
          name="Email"
        />
        <inputProfile
          v-model="dataUser.age"
          type="number"
          placeholder="Age"
          name="Age"
          min="0"
          onkeypress="return event.charCode >= 48 && event.charCode <= 57"
        />
      </div>
    </form>

    <span
      v-if="messageError"
      class="flex justify-center text-[red] mt-[10px] text-center"
      >{{ messageError }}</span
    >
    <span
      v-else
      class="flex justify-center text-[#0b8124] mt-[10px] text-center"
      >{{ messageSuccess }}</span
    >

    <div class="flex items-center justify-center gap-[20px] mt-[40px]">
      <button
        class="text-[18px] font-[500] text-[#ffffff] flex items-center gap-[10px] px-[40px] py-[10px] bg-[#d90e32] rounded-[10px]"
        @click="saveEdit"
        type="button"
      >
        Save
      </button>

      <button
        @click="logout"
        class="flex items-center gap-[10px] px-[12px] py-[10px] bg-[#8e8ef3] rounded-[10px]"
      >
        <span class="text-[18px] font-[500]">Log Out</span>
        <Icon
          name="i-material-symbols:exit-to-app-sharp"
          class="w-[24px] h-[24px] bg-[#000000]"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IUser } from "~/types/user";
const router = useRouter();

const { clear } = useUserSession();

const { preview } = usePhoto();

const dataUser = ref<IUser>({
  name: "",
  email: "",
  age: null,
  profilePic: null,
});

const { messageError, messageSuccess } = useMessage();

const { data } = await useFetch<IUser>("/api/profile/user");

const saveEdit = async (): Promise<void> => {
  messageError.value = null;
  messageSuccess.value = null;
  try {
    const response: IUser = await $fetch("/api/profile/userEdit", {
      method: "PUT",
      body: dataUser.value,
    });

    console.log(response);

    if (response) {
      messageSuccess.value = "Changes saved successfully.";
      setTimeout(() => {
        messageSuccess.value = null;
      }, 4000);
    }
  } catch (error: any) {
    if (error.statusCode === 400) {
      messageError.value = error.data.message;
    }
  }
};

const getInfoProfile = async (): Promise<void> => {
  try {
    if (data.value) {
      dataUser.value = data.value;
      preview.value = data.value.profilePic;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Get profile error:", error.message);
    }
  }
};

const logout = async (): Promise<void> => {
  await clear();
  router.push("/auth");
};

onMounted(getInfoProfile);
onBeforeMount(() => {
  messageError.value = null;
  messageSuccess.value = null;
});
</script>
