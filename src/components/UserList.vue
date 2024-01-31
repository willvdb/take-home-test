<template>
  <div>
    <div v-if="!loading">
      <q-list class="q-py-md" dense>
        <q-item v-for="user in users" clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img :src="user.avatar ? user.avatar : 'src/assets/blank-profile-picture.png'"
                :alt="user.avatar ? 'avatar' : 'no avatar'">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <span>{{ user.first_name }} {{ user.last_name }}</span>
          </q-item-section>
          <q-menu class="text-black q-pa-sm">
            <div class="row">
              <div class="column justify-center items-center">
                <q-avatar size="20vh">
                  <img :src="user.avatar ? user.avatar : 'src/assets/blank-profile-picture.png'"
                    :alt="user.avatar ? 'avatar' : 'no avatar'">
                </q-avatar>
              </div>
              <q-separator vertical inset class="q-mx-lg" />
              <div class="column">
                <div class="row justify-end">
                  <q-btn flat color="primary" v-close-popup icon="close"></q-btn>
                </div>
                <div class="row">
                  <div class="column">
                    <div class="row justify-start">
                      <span>id: {{ user.id }}</span>
                    </div>
                    <div class="row">
                      <span>name: {{ user.first_name }} {{ user.last_name }}</span>
                    </div>
                    <div class="row">
                      <span>email: {{ user.email }}</span>
                    </div>
                  </div>
                </div>
                <div class="row justify-between">
                  <q-btn flat color="primary" label="edit" @click="setActiveUser(user)"><q-menu
                      class="text-black q-pa-sm">
                      <q-form @submit="updateUser" @reset="resetUser" class="q-gutter-md">

                        <q-input filled v-model="activeUserId" label="ID" hint="you cannot change ID" disabled readonly
                          class="hide"></q-input>

                        <q-input filled v-model="newUserName" label="Your name *" hint="First and Last Name" lazy-rules
                          :rules="[val => val && val.length > 0 || 'Please type something',
                          val => val.split(' ').length > 1 || 'Please enter first AND last name',
                          val => val.split(' ').length < 3 && val.split(' ')[0].length > 0 && val.split(' ')[1].length > 0 || 'Please enter first and last name only']" />

                        <q-input filled type="email" v-model="newUserEmail" label="Email Address" lazy-rules :rules="[
                          val => isValidEmail(val) || 'Please enter a valid email address'
                        ]" />

                        <q-input filled v-model="newAvatar" label="Your avatar link" hint="Avatar link or leave blank"
                          lazy-rules :rules="[val => isValidURL(val) || 'Please type a valid url or none at all']" />


                        <div>
                          <q-btn label="Submit" type="submit" color="primary" v-close-popup />
                          <q-btn label="Close" type="reset" color="primary" flat class="q-ml-sm" v-close-popup />
                        </div>
                      </q-form>
                    </q-menu></q-btn>
                  <q-btn flat color="primary" v-close-popup @click="deleteUser(user)">delete</q-btn>
                </div>
              </div>
            </div>
          </q-menu>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-btn icon="add"></q-btn>
          </q-item-section>
          <q-item-section>
            <span>add user</span>
          </q-item-section>
          <q-menu class="text-black q-pa-sm">
            <q-form @submit="createUser" @reset="resetUser" class="q-gutter-md">

              <q-input filled v-model="newUserName" label="Your name *" hint="First and Last Name" lazy-rules
                :rules="[val => val && val.length > 0 || 'Please type something',
                val => val.split(' ').length > 1 || 'Please enter first AND last name',
                val => val.split(' ').length < 3 && val.split(' ')[0].length > 0 && val.split(' ')[1].length > 0 || 'Please enter first and last name only']" />

              <q-input filled type="email" v-model="newUserEmail" label="Email Address" lazy-rules :rules="[
                val => isValidEmail(val) || 'Please enter a valid email address'
              ]" />

              <q-input filled v-model="newAvatar" label="Your avatar link" hint="Avatar link or leave blank" lazy-rules
                :rules="[val => isValidURL(val) || 'Please type a valid url or none at all']" />


              <div>
                <q-btn label="Submit" type="submit" color="primary" v-close-popup />
                <q-btn label="Close" type="reset" color="primary" flat class="q-ml-sm" v-close-popup />
              </div>
            </q-form>
          </q-menu>
        </q-item>
      </q-list>
      <q-dialog v-model="alert" class="text-black">
        <q-card>
          <q-card-section>
            <div class="text-h6">Alert</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{ message }}
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <q-circular-progress v-else indeterminate rounded size="50px" color="lime" class="q-ma-md" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import testService from "../services/test.service";

interface User {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  avatar: string
}

const users = ref<User[]>([]);
const loading = ref(false);
const message = ref('');
const alert = ref(false);
const newUserName = ref('');
const newUserEmail = ref('');
const newAvatar = ref('');
const activeUserId = ref<number | null>(null);

const emailRegex = new RegExp(
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
);

const isValidEmail = (email: string) => {
  return email ? emailRegex.test(email) : false;
};

const isValidURL = (url: string) => {
  try {
    if (!url) {
      return true;
    }
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

const fetchUsers = async (page: number) => {
  try {
    const res = await testService.get(`users?page=${page}`);
    users.value = users.value.concat(res.data);
    if (page < res.total_pages) {
      await fetchUsers(page + 1);
    }
  } catch (err) {
    console.log(err);
  }
};

const setActiveUser = (user: User) => {
  newUserName.value = user.first_name + ' ' + user.last_name;
  activeUserId.value = user.id;
  newUserEmail.value = user.email;
  newAvatar.value = user.avatar;
}

const deleteUser = async (user: User) => {
  try {
    loading.value = true;
    await testService.delete(`users/${user.id}`);
  } catch (err) {
    message.value = `${err}`;
  } finally {
    alert.value = true;
    message.value = `${user.first_name} ${user.last_name} successfully deleted`;
    const indexOfUser = users.value.indexOf(user);
    users.value.splice(indexOfUser, 1);
    loading.value = false;
  }
}

const createUser = async () => {
  try {
    loading.value = true;
    const newUser: User = await testService.post('users', { first_name: newUserName.value.split(' ')[0], last_name: newUserName.value.split(' ')[1], email: newUserEmail.value, avatar: newAvatar.value });
    users.value.splice(users.value.length, 0, newUser);
  } catch (err) {
    alert.value = true;
    message.value = `${err}`;
  } finally {
    alert.value = true;
    message.value = `user ${newUserName.value} successfully created`;
    resetUser();
    loading.value = false;
  }
}

const updateUser = async () => {
  try {
    loading.value = true;
    const newUser: User = await testService.put(`users/${activeUserId.value}`, { id: activeUserId.value, first_name: newUserName.value.split(' ')[0], last_name: newUserName.value.split(' ')[1], email: newUserEmail.value, avatar: newAvatar.value });
    const oldUser: User = users.value.find(user => user.id === activeUserId.value)!!;
    const indexOfUser = users.value.indexOf(oldUser);
    users.value.splice(indexOfUser, 1, newUser);
  } catch (err) {
    alert.value = true;
    message.value = `${err}`;
  } finally {
    alert.value = true;
    message.value = `user ${newUserName.value} successfully updated`;
    resetUser();
    loading.value = false;
  }
}


const resetUser = async () => {
  newUserName.value = '';
  newUserEmail.value = '';
  newAvatar.value = '';
  activeUserId.value = null;

}

onMounted(async () => {
  try {
    loading.value = true;
    await fetchUsers(1);
  } catch (err) {
    console.log(err);
  }
  finally {
    loading.value = false;
  }
});
</script>
<style>
.text-black {
  color: black;
}

.hide {
  display: none;
}
</style>
