<script setup lang="ts">
//Import tools
import { ref } from 'vue';
import LoginComponent from '@/components/auth/LoginComponent.vue';
import PlansComponent from '@/components/PlansComponent.vue';

//Variables
const is_user = ref(false);
</script>

<template>
    <main class="pages">
        <LoginComponent v-if="is_user === true" />
        <PlansComponent v-else />
        <section class="is-user">
            <p v-if="is_user === true">
                ¿No tienes cuenta?
                <span @click="is_user = false">Afiliarme</span>
            </p>
            <p v-else>
                ¿Ya tienes cuenta?
                <span @click="is_user = true">Iniciar Sesión</span>
            </p>
        </section>
    </main>
</template>

<style scoped lang="scss">
.pages {
    min-height: 100vh;
    justify-content: center;
    .is-user {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 2rem 0;
        p {
            margin: 0.5rem;
            span {
                color: var(--color-tertiary);
                cursor: pointer;
            }
        }
    }
}
</style>
