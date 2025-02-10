<script setup lang="ts">
//Import tools
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user-store';

//Variables
const route = useRoute();
const userStore = useUserStore();
const newPassword = ref('');
const confirmPassword = ref('');

//Methods
const resetPassword = async () => {
    const token = route.params.token;
    await userStore.change_password(token as string, newPassword.value);
};
</script>

<template>
    <main class="pages">
        <h2>Restablecer Contraseña</h2>
        <input
            type="password"
            v-model="newPassword"
            placeholder="Nueva Contraseña"
        />
        <input
            type="password"
            v-model="confirmPassword"
            placeholder="Confirmar Contraseña"
        />
        <button
            class="button__action"
            @click="resetPassword"
            v-if="confirmPassword === newPassword && newPassword.length > 0"
        >
            Restablecer
        </button>
    </main>
</template>

<style lang="scss" scoped>
.pages {
    align-items: center;
    input {
        margin: 1rem;
        padding: 1rem;
        border-radius: 1rem;
        border: 1px solid #ccc;
    }
    button {
        margin-top: 2rem;
    }
}
</style>
