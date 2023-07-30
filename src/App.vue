<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="./assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <q-tabs v-model="tab" class="text-primary">
        <q-tab name="instructions" icon="list" label="Instructions" />
        <q-tab name="users" icon="person" label="Users" />
      </q-tabs>
      <HelloWorld msg="Welcome" />
    </div>
  </header>

  <main>
    <TheInstructions v-if="tab == 'instructions'" />
    <UserList v-if="tab == 'users'" />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import TheInstructions from "./components/TheInstructions.vue";
import UserList from "./components/UserList.vue";

const tab = ref("instructions");
</script>
