<template> Your component goes here </template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import testService from "../services/test.service";

const users = ref([]);

onMounted(async () => {
  const res = await testService.get("users");
  users.value = res.data;
});
</script>
