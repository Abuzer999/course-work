<template>
  <div>
    <form>
      <avatarProfile />

      <childInput v-model="dataUser.name" type="text" placeholder="Name" />
      <childInput v-model="dataUser.email" type="email" placeholder="Email" />
      <childInput v-model="dataUser.age" type="number" placeholder="Age" />

      <div>
        <label>Gender:</label>
        <div>
          <label for="male">Male</label>
          <input
            v-model="dataUser.gender"
            id="male"
            type="radio"
            value="male"
          />
        </div>
        <div>
          <label for="female">Female</label>
          <input
            v-model="dataUser.gender"
            id="female"
            type="radio"
            value="female"
          />
        </div>
      </div>
      <button
        class="mb-[40px] flex items-center gap-[10px] px-[12px] py-[10px] bg-[#8e8ef3] rounded-[10px]"
        @click="saveEdit"
        type="button"
      >
        Save
      </button>
    </form>

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
</template>

<script setup lang="ts">
//переделать структуру компнонета
import type { IUser } from "~/types/user";
const router = useRouter();
const { clear } = useUserSession();

const { preview } = usePhoto();

const dataUser = ref<IUser>({
  name: "",
  email: "",
  age: null,
  gender: null,
  profilePic: null,
});

const { data, error } = await useFetch<IUser>("/api/profile/user");

const saveEdit = async (): Promise<void> => {
  try {
    const response: IUser = await $fetch("/api/profile/userEdit", {
      method: "PUT",
      body: dataUser.value,
    });

    if (response) {
      console.log(response);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Get profile error:", error.message);
    }
  }
};

const getInfoProfile = async (): Promise<void> => {
  try {
    if (error.value) {
      console.error("Get profile error:", error.value.message);
    }

    console.log(data.value);

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
</script>
