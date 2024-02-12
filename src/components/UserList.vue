<template> 
  <div class="q-my-sm;" style="max-width: 350px; background-color: rgb(51,51,51);">
    <q-list bordered>
      <q-expansion-item v-for="user in users" :key="user.id" v-model="expanded[user.id]" @click="closeOthers(user.id)">
        <template v-slot:header="{ expanded }">
          <q-item-section avatar>
            <q-avatar v-if="user.avatar != null">
              <img :src="user.avatar">
            </q-avatar>
            <q-avatar v-if="user.avatar == null">
              <q-avatar color="primary" text-color="white" align="center" style="height: 100%;">{{ user.first_name.charAt(0).toUpperCase() }}{{ user.last_name.charAt(0).toUpperCase() }}</q-avatar>
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ user.first_name }}{{" "}}{{ user.last_name }}</q-item-label>
            
          </q-item-section>
        </template>
        <q-card>
          <q-card-section style="background-color: rgb(37,37,37); min-height: 40px; display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center;">
              <q-item-label caption lines="1" style="color: rgb(152, 152, 152); font-size: medium; height: 20px;">
                {{ user.email }}
              </q-item-label>
            </div>
            <span></span>
            <div>
              <q-icon name="edit" @click="editClick(user.id)" class="cursor-pointer" style="margin-right: 10px; font-size: large;"/>
              <q-icon name="close" @click="deleteClick(user)" class="cursor-pointer" style="font-size: large;"/>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-item style="background-color: rgb(73, 73, 73);">
        <q-item-section @click="addPopupVisible=true" class="cursor-pointer" >
          <q-item-label align="left" style="font-size: large;">Add User</q-item-label>
        </q-item-section>
        <q-icon name="add" @click="addPopupVisible=true" class="cursor-pointer" style="font-size: xx-large; margin-right: -5px" align="right"></q-icon>
      </q-item>
    </q-list>
  </div>
  <div>
    <q-dialog v-model="editPopupVisible">
      <q-card>
        <q-card-section>
          <q-input v-model="firstName" label="First Name" />
          <q-input v-model="lastName" label="Last Name" />
          <q-input v-model="email" label="Email" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Save" color="primary" @click="saveClick()" />
          <q-btn label="Close" color="primary" @click="editPopupVisible=false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
  <div>
    <q-dialog v-model="addPopupVisible">
      <q-card>
        <q-card-section>
          <q-input v-model="firstName" label="First Name" />
          <q-input v-model="lastName" label="Last Name" />
          <q-input v-model="email" label="Email" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Save" color="primary" @click="addUserClick" />
          <q-btn label="Close" color="primary" @click="addPopupVisible=false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref} from "vue";
import testService from "../services/test.service";
import { setgroups } from "process";

const users = ref([]);
const editPopupVisible = ref(false);
const addPopupVisible = ref(false);
const stringHolder = ref("");
let editID: number;
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const expanded = ref([]);

onMounted(async () => {
  const res = await testService.get("users");
  users.value = res.data;
  editPopupVisible.value = false; // Set as a value of the ref
  addPopupVisible.value = false;
  for (let i  = 0; i < users.value.length; i++) {
    expanded.value[i] = false;
  }
});

function getUser() {
  return users.value[editID]
}

function editClick( id: number) {
  editID = id-1; 
  let user: any = getUser()
  firstName.value = user.first_name;
  lastName.value = user.last_name;
  email.value = user.email;
  
  editPopupVisible.value = true;
}

async function deleteClick(user: any) {
  let spliced: boolean = false;
  for(let i = 0; i < users.value.length; i++) {
    if (users.value[i].id == user.id) {
      //because the database was never actually updated, the ids no longer matched up with the array indexes, so a makeshift fix was necessary.
      users.value.splice(i, 1);
      spliced = true;
    }
    if (spliced) {
      users.value[i].id = i+1;
    }
  }
  for (let i  = 0; i < expanded.value.length; i++) {
    expanded.value[i] = false;
  }
  await testService.delete('users/' + user.id + '/');
  editPopupVisible.value = false; 
}
async function saveClick() {
  
  users.value[editID].first_name = firstName.value;
  users.value[editID].last_name = lastName.value;
  users.value[editID].email = email.value;

  let updateInfo = {first_name: firstName.value, last_name: lastName.value, email: email.value}
  await testService.patch('users/' + (editID+1) + '/', updateInfo)

  firstName.value = "";
  lastName.value = "";
  email.value = "";

  editPopupVisible.value = false; 
}

async function addUserClick() {
  addPopupVisible.value = false;
  let newUser = {id: users.value.length+1, first_name: firstName.value, last_name: lastName.value, email: email.value, avatar: null};
  users.value.push(newUser);
  expanded.value[users.value.length];

  await testService.post('users/', newUser);
  
  firstName.value = "";
  lastName.value = "";
  email.value = ""
}

function closeOthers(id: number) {
  for (let i  = 0; i < users.value.length+1; i++) {
    if (id != i ) {
      expanded.value[i] = false;
    }
  }
}

</script> 