<template>
  <div>
    <label for="username">Username</label>
    <input v-model="name" id="username" type="text" />
  </div>
</template>

<script lang="ts" setup>
import type { IUser } from '~/types/user';

defineProps<IUser>()
</script>
