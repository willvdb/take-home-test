<template>
  <!-- User Detail Dialog -->
  <q-dialog v-model="showModal" transition-show="fade" transition-hide="fade">
    <div class="user-detail-container">
      <!-- Close Button -->
      <div class="close-button" @click="goBackToList">
        <div class="close-button-inner">
          <q-icon name="close" color="grey" />
        </div>
      </div>
      <!-- User Content -->
      <div class="user-content">
        <!-- User Avatar -->
        <q-avatar rounded size="200px">
          <img :src="user.avatar" :alt="userFullName" />
        </q-avatar>
        <!-- User Information -->
        <div class="user-info">
          <p class="user-name">{{ user.first_name }} {{ user.last_name }}</p>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted, defineProps, watch } from 'vue';

const props = defineProps({
  user: Object,
});

const userFullName = ref('');

const showModal = ref(false);

const showUserDetail = () => {
  showModal.value = true;
};

const goBackToList = () => {
  showModal.value = false;
};

// Watch for changes in the user prop
watch(() => props.user, () => {
  // Reset the dialog when the user prop changes
  showModal.value = false;
  userFullName.value = `${props.user.first_name} ${props.user.last_name}`;
  // Show the dialog after resetting
  showUserDetail();
}, { immediate: true }); // Call the watcher immediately when the component is mounted
</script>

<style scoped>
.user-detail-container {
  width: 400px;
  height: 400px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
}

.user-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-info {
  margin-top: 20px;
}

.user-name {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.close-button {
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
}

.close-button-inner {
  background-color: rgb(209, 209, 209);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
