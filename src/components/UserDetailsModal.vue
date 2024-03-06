<template>
	<q-dialog v-model="props.show">
		<q-card :style="{ minWidth: '30rem' }">
			<q-card-section
				:style="{
					display: 'flex',
					flexDirection: 'column',
					gap: '0.5rem',
					alignItems: 'center',
				}"
			>
				<q-avatar size="12rem"
					><img v-if="avatarSrc" :src="avatarSrc"
				/></q-avatar>
				<q-file
					v-if="props.editing"
					style="max-width: 14rem"
					v-model="newAvatar"
					label="Change Avatar"
					filled
					accept=".jpg, image/*"
				></q-file>
			</q-card-section>
			<q-card-section>
				<q-input
					:rules="[(val) => !!val || 'Field is required']"
					v-model="props.user.first_name"
					label="First Name"
					:disable="!props.editing"
				/>
				<q-input
					:rules="[(val) => !!val || 'Field is required']"
					v-model="props.user.last_name"
					label="Last Name"
					:disable="!props.editing"
				/>
				<q-input
					:rules="[(val) => !!val || 'Field is required']"
					v-model="props.user.email"
					label="Email"
					:disable="!props.editing"
				/>
			</q-card-section>
			<q-card-actions
				:style="{
					display: 'flex',
					justifyContent: 'space-between',
					width: 'auto',
					float: 'right',
					gap: '1rem',
				}"
			>
				<q-btn
					v-if="props.editing"
					label="Cancel"
					color="primary"
					@click="$emit('cancel')"
				/>
				<q-btn v-else label="Close" color="primary" @click="$emit('cancel')" />
				<q-btn
					v-if="props.editing"
					:disable="disabled"
					label="Save"
					color="green"
					@click="saveUser"
				/>
				<q-btn v-else label="Edit" color="blue" @click="$emit('edit')" />
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script setup lang="ts">
	import { computed, ref, watch } from 'vue';
	import testService from '../services/test.service';
	const emit = defineEmits(['cancel', 'save', 'edit']);
	import { type User } from './types';

	const props = defineProps<{ user: User; editing: boolean; show: boolean }>();

	const newAvatar = ref<File | null>();
	const avatarSrc = ref<string>(props.user.avatar);

	const disabled = computed(() => {
		return (
			!avatarSrc ||
			!props.user.first_name ||
			!props.user.last_name ||
			!props.user.email
		);
	});
	const saveUser = async () => {
		try {
			const res = await testService.put(`users/${props.user.id || ''}`, {
				...props.user,
				avatar: avatarSrc.value,
			});
			emit('save', res);
		} catch (error) {
			//handle error in some way, not in requirements
			console.log(error);
		}
	};
	watch(newAvatar, (newVal, oldVal) => {
		if (newVal) {
			avatarSrc.value = URL.createObjectURL(newVal);
		}
	});
</script>
