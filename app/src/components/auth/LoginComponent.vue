<script setup lang="ts">
//Import tools
import { ref } from 'vue';
import { useUserStore } from '@/stores/user-store';

//Variables
const userStore = useUserStore();
const email = ref('');
const password = ref('');

//Methods
const login = async () => {
    await userStore.login(email.value, password.value);
};
</script>

<template>
    <section class="login">
        <h2>Inicia Sesión</h2>
        <input type="email" v-model="email" placeholder="Email" />
        <input type="password" v-model="password" placeholder="Contraseña" />
        <button class="button__action" @click="login">Login</button>
    </section>
</template>

<style lang="scss" scoped>
.login {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
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
