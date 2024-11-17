<script setup lang="ts">
//Import to
import { useUserStore } from '@/stores/user-store';

//Variables
const userStore = useUserStore();
</script>

<template>
    <header>
        <RouterLink to="/" class="logo">
            <img src="/icons/vite.svg" alt="logo silicit" class="logo__image" />
            SILICIT
        </RouterLink>
        <div class="buttons">
            <RouterLink
                to="/dashboard"
                class="button__action"
                v-if="userStore.token"
                >Ver Dashboard</RouterLink
            >
            <RouterLink to="/acceder" class="button__action" v-else>
                Acceder
            </RouterLink>
            <button
                class="button__pasive"
                @click="userStore.logout"
                v-if="userStore.token"
            >
                Cerrar Sesión
            </button>
        </div>
    </header>
</template>

<style scoped lang="scss">
header {
    width: 100%;
    max-height: 5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 4rem;
    position: fixed;
    top: 0;
    left: 0;
    box-sizing: border-box;
    z-index: 100;

    .buttons {
        display: flex;
        align-items: center;
        gap: 1rem;

        .button__action {
            margin: 0;
        }
    }
}

.logo {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0;
    font-size: 2rem;
    letter-spacing: 0.2rem;
    color: var(--color-accent);
    border-radius: 0.5rem;
    text-decoration: none;

    .logo__image {
        width: 3rem;
        height: 3rem;
    }

    &:hover {
        color: var(--color-tertiary);
        transform: scale(1.05);
    }
}
</style>
