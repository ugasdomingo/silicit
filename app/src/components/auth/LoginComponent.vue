<script setup lang="ts">
//Import tools
import { ref } from 'vue';
import { useUserStore } from '@/stores/user-store';

//Variables
const userStore = useUserStore();
const email = ref('');
const password = ref('');
const forgotPassword = ref(false);

//Methods
const login = async () => {
    await userStore.login(email.value, password.value);
};
</script>

<template>
    <section class="forgot__password" v-if="forgotPassword">
        <h2>Recuperar Contraseña</h2>
        <input type="email" placeholder="Email" v-model="email" />
        <button
            class="button__action"
            @click="userStore.forgot_password(email)"
        >
            Recuperar
        </button>
        <button class="button__pasive" @click="forgotPassword = false">
            Cancelar
        </button>
    </section>
    <section class="login" v-else>
        <h2>Inicia Sesión</h2>
        <input type="email" v-model="email" placeholder="Email" />
        <input type="password" v-model="password" placeholder="Contraseña" />
        <button class="button__action" @click="login">Login</button>
        <button class="button__pasive" @click="forgotPassword = true">
            Olvidé mi contraseña
        </button>
    </section>
</template>

<style lang="scss" scoped>
.forgot__password {
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
    .button__pasive {
        border: none;
    }
}
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
    .button__pasive {
        border: none;
    }
}
</style>
