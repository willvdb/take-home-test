<template>
  <div class="q-pa-md user-list-container" style="max-width: 350px">
    <!-- Title -->
    <h1>Users</h1>
    <!-- User List -->
    <q-list bordered>
      <!-- Loop through users and make each item clickable -->
      <q-item v-for="(user, index) in users" :key="index" :clickable="!isEditMode" @click="toggleUserDetail(user)">
        <q-item-section>
          <!-- Display user information or edit fields based on edit mode -->
          <template v-if="user !== editUser">
            {{ user.first_name }} {{ user.last_name }}
          </template>
          <template v-else>
            <div class="edit-mode">
              <!-- Edit Mode: Input fields for first name, last name, and avatar -->
              <q-input v-model="editedUser.first_name" label="First Name" dense />
              <q-input v-model="editedUser.last_name" label="Last Name" dense />
              <q-input v-model="editedUser.avatar" label="Avatar URL" dense />
            </div>
          </template>
        </q-item-section>
        <!-- Display user avatar -->
        <q-item-section avatar>
          <q-avatar rounded>
            <img :src="user.avatar" :alt="`${user.first_name} ${user.last_name}`" />
          </q-avatar>
        </q-item-section>
        <!-- Action buttons for editing and deleting users -->
        <q-item-section side class="button-section">
          <q-btn
            :icon="editUser === user ? 'check' : 'edit'"
            :color="editUser === user ? 'positive' : 'primary'"
            @click="editUserMode(user)"
            dense
            class="action-button"
          />
          <q-btn
            v-if="user === editUser"
            icon="delete"
            color="negative"
            @click="deleteUser(index)"
            dense
            class="action-button"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <!-- User Detail View -->
    <user-detail-view v-if="isUserDetailVisible" :user="selectedUser" @backToList="hideUserDetail" />
  </div>
  <!-- Button to add a new user -->
  <div class="q-pa-md btn">
    <q-btn label="New User" color="primary" @click="addUserPrompt" />
  </div>
</template>

<script setup lang="ts">
import UserDetailView from "./UserDetailView.vue";
import { onMounted, ref } from "vue";
import testService from "../services/test.service";

// Define the type of users
interface User {
  first_name: string;
  last_name: string;
  avatar: string;
}

// Reactive variables
const users = ref([]);
const selectedUser = ref(null);
const editUser = ref(null);
const editedUser = ref({
  first_name: "",
  last_name: "",
  avatar: "https://thispersondoesnotexist.com/",
});

onMounted(async () => {
  // Fetch user data on component mount
  const res = await testService.get("users");
  users.value = res.data;
});

// Flags to control component behavior
const isEditMode = ref(false); // Edit mode flag
const isUserDetailVisible = ref(false); // User detail view flag

// Method to open the custom dialog for adding a new user and enter edit mode
const addUserPrompt = () => {
  // Clear the editedUser fields
  editedUser.value.first_name = "";
  editedUser.value.last_name = "";
  editedUser.value.avatar = "https://thispersondoesnotexist.com/"; // Set the avatar URL for new user
  editUser.value = null;
  isEditMode.value = true;

  // Create a new empty user and add it to the list
  const newUser: User = {
    first_name: "",
    last_name: "",
    avatar: "https://thispersondoesnotexist.com/",
  };

  users.value.push(newUser);

  // Set the editUser to the newly added user
  editUser.value = newUser;
};

// Method to enter edit mode for a user
const editUserMode = (user: User) => {
  if (user === editUser.value) {
    // If already in edit mode, save changes
    user.first_name = editedUser.value.first_name;
    user.last_name = editedUser.value.last_name;
    user.avatar = editedUser.value.avatar;
    editUser.value = null;
    isEditMode.value = false; // Exit edit mode
  } else {
    // Enter edit mode for this user
    editUser.value = user;
    editedUser.value.first_name = user.first_name;
    editedUser.value.last_name = user.last_name;
    editedUser.value.avatar = user.avatar;
    isEditMode.value = true;
  }
};

// Method to delete a user from the list
const deleteUser = (index: number) => {
  // Remove the user from the list without confirmation
  users.value.splice(index, 1);
  console.log("User deleted");
  editUser.value = null; // Exit edit mode if the user being edited is deleted
  isEditMode.value = false; // Exit edit mode
};

// Method to show or hide the user detail view
const toggleUserDetail = (user) => {
  if (selectedUser.value === user && isUserDetailVisible.value) {
    // If the same user is clicked again, hide the user detail view
    hideUserDetail();
  } else {
    // Show the user detail view
    selectedUser.value = user;
    isUserDetailVisible.value = true;
  }
};

// Method to hide the user detail view
const hideUserDetail = () => {
  isUserDetailVisible.value = false;
};

// Method to go back to the user list view from the detail view
const goBackToList = () => {
  hideUserDetail();
};
</script>

<style scoped>
.user-list-container {
  max-width: 350px;
  margin: 0 auto;
}

.btn {
  max-width: 350px;
  margin: 0 auto;
}

.edit-mode {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.q-input {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  color: #333;
  font-size: 14px;
  transition: border-color 0.2s, background-color 0.2s;
}

.q-input:hover {
  background-color: #fff;
  border-color: #aaa;
}

.q-input:focus {
  background-color: #fff;
  border-color: #0078d4;
  box-shadow: 0 0 0 2px rgba(0, 120, 212, 0.3);
}

/* Add margin to the buttons for spacing */
.button-section {
  display: flex;
  gap: 10px;
}

.action-button {
  min-width: 32px;
  padding: 6px;
}

h1 {
  font-size: 1.2rem;
  font-weight: 500;
  color: var
(--color-heading);
}
</style>
