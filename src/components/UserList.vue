<template>
	<q-virtual-scroll
		style="max-height: 500px"
		:items="users"
		separator
		v-slot="{ item }"
	>
		<q-item @click="selectUser(item)" clickable v-ripple :key="item.id">
			<q-item-section avatar>
				<q-avatar size="4rem"><img :src="item.avatar" /></q-avatar>
			</q-item-section>
			<q-item-section>
				<q-item-label>{{
					`Name: ${item.first_name} ${item.last_name}`
				}}</q-item-label>
				<q-item-label>{{ `Email: ${item.email}` }}</q-item-label>
			</q-item-section>
			<q-item-section avatar>
				<q-btn
					@click.stop="editUser(item)"
					size="1.25rem"
					flat
					round
					text-color="blue"
					icon="edit"
				/>
			</q-item-section>
			<q-item-section avatar>
				<q-btn
					@click.stop="deleteUser(item)"
					size="1.25rem"
					flat
					round
					text-color="red"
					icon="delete"
				/>
			</q-item-section>
		</q-item>
	</q-virtual-scroll>
	<user-details-modal
		v-if="!!selectedUser"
		@save="refresh"
		@cancel="cancelEdit"
		@edit="editing = true"
		:editing="editing"
		:user="selectedUser"
		:show="show"
	></user-details-modal>
	<q-btn
		:style="{ float: 'right' }"
		@click="addUser"
		size="1.25rem"
		text-color="green"
		>Add User</q-btn
	>
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import testService from '../services/test.service';
	import UserDetailsModal from './UserDetailsModal.vue';
	import { type User } from './types';

	const users = ref<User[]>([]);
	const editing = ref(false);
	const show = ref(false);
	const selectedUser = ref<User | null>(null);
	onMounted(async () => {
		const res = await testService.get('users');
		users.value = res.data;
	});
	const deleteUser = async (user: User) => {
		try {
			const res = await testService.delete(`users/${user.id}`);
			users.value = users.value.filter((tmp) => tmp.id !== user.id);
		} catch (error) {
			//handle error in some way, not in requirements
			console.log(error);
		}
	};

	const editUser = (user: User) => {
		selectedUser.value = { ...user };
		editing.value = true;
		show.value = true;
	};

	//In actual API I could simply do a get here to update the list of users, but with test api I need to update manually
	const refresh = (user: User) => {
		const index = users.value.findIndex((tmp: User) => tmp.id === user.id);
		if (index !== -1) {
			users.value[index] = user;
		} else {
			//If not found then it is from adding a new user
			users.value.push(user);
		}
		editing.value = false;
		selectedUser.value = null;
		show.value = false;
	};

	const cancelEdit = () => {
		editing.value = false;
		selectedUser.value = null;
		show.value = false;
	};

	const selectUser = (user: User) => {
		selectedUser.value = { ...user };
		show.value = true;
	};

	const addUser = () => {
		selectedUser.value = {
			first_name: '',
			last_name: '',
			email: '',
			avatar: '',
		};
		editing.value = true;
		show.value = true;
	};
</script>
