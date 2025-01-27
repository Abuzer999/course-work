<template>
  <div>
    <form>
      <div>
        <label for="name">Name</label>
        <input v-model="dataUser.name" id="name" type="text" />
      </div>
      <div>
        <label for="email">Email</label>
        <input v-model="dataUser.email" id="email" type="email" />
      </div>
      <div>
        <label for="age">Age</label>
        <input v-model="dataUser.age" id="age" type="number" />
      </div>
      <div>
        <label for="gender">gender</label>
        <input v-model="dataUser.gender" id="gender" type="number" />
      </div>
      <button type="submit">Save</button>
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
interface IUser {
  name: string;
  email: string;
  age: number | null;
  gender: string | null;
}

const dataUser = ref<IUser>({
  name: "",
  email: "",
  age: null,
  gender: null,
});

// const getProfile = async () => {
//   try {
//     const data = await $fetch<{ body: IUser }>("/api/profile/info", {
//       method: "GET",
//     });

//     dataUser.value = data.body;

//     console.log(data);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error("Get profile error:", error);
//     }
//   }
// };

const logout = async () => {
  try {
    const response = await $fetch("/api/auth/logout", {
      method: "POST",
    });
    console.log(response);
    useRouter().push("/auth");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Logout error:", error);
    }
  }
};

// onMounted(getProfile);
</script>
