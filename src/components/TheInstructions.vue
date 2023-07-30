<template>
  <InstructionItem>
    <template #icon>
      <q-icon name="far fa-square-check" color="primary" />
    </template>
    <template #heading>Task</template>

    Your task is to write a component for providing basic CRUD functionality for
    a list of users. How you choose to display users is up to you. The users
    will come from the Reqres test API. A service to interact with the api has
    been provided with an example of it's use in the UserList component.
  </InstructionItem>
  <InstructionItem>
    <template #icon>
      <q-icon name="fas fa-clipboard" color="primary" />
    </template>
    <template #heading>Requrements</template>

    <q-list dense>
      <q-item clickable v-ripple>
        A way to view all users in a list.
      </q-item>
      <q-item clickable v-ripple>
        A way to view an individual user and all their information + avatar.
      </q-item>
      <q-item clickable v-ripple>
        A way to update an individual users information.
      </q-item>
      <q-item clickable v-ripple>
        A way to create a new user.
      </q-item>
      <q-item clickable v-ripple>
        A way to delete a given user.
      </q-item>
      <q-item clickable v-ripple>
        You must use the vue 3 Composition api.
      </q-item>
    </q-list>

    The test api is not completely functional. It will give allow you to view
    users, but any updates or deletions will not actually occur. Requests to
    create, update and delete will appear to work, but the underlying database
    will not be changed. Don't worry about the data not actually changing, the
    important thing is just interacting with the api and giving the user
    feedback.
  </InstructionItem>

  <InstructionItem>
    <template #icon>
      <q-icon name="far fa-file-lines" color="primary" />
    </template>
    <template #heading>Documentation</template>
    <span>
      Here's a link to the Vue
      <a href="https://vuejs.org/" target="_blank" rel="noopener"
        >official documentation</a
      >
    </span>
    <q-separator spaced inset vertical dark />
    <span>
      And here is a link to the Quasar
      <a href="https://quasar.dev/components" target="_blank" rel="noopener"
        >official documentation</a
      >
    </span>
    <q-separator spaced inset vertical dark />
    <span>
      And here is a link to the
      <a href="https://reqres.in/" target="_blank" rel="noopener"
        >documentation</a
      >
      for the test api
    </span>
  </InstructionItem>
</template>

<script setup lang="ts">
import InstructionItem from "./InstructionItem.vue";
</script>
