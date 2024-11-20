<script setup lang="ts">
//Import to
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user-store';
import { useUtilStore } from '@/stores/util-store';

//Variables
const user_store = useUserStore();
const util_store = useUtilStore();
const is_hidden = ref(false);
const need_bg = ref(false);
let last_scrollY = 0;

//Functions
const handleScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY > last_scrollY && !is_hidden.value) {
        is_hidden.value = true;
    } else if (scrollY < last_scrollY && is_hidden.value) {
        is_hidden.value = false;
    }

    last_scrollY = scrollY;

    if (scrollY > 100 && !need_bg.value) {
        need_bg.value = true;
    } else if (scrollY < 100 && need_bg.value) {
        need_bg.value = false;
    }
};

//Hooks
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    util_store.screen_size();
});
</script>

<template>
    <header :class="{ hidden: is_hidden, bg__color: need_bg }">
        <RouterLink to="/" class="logo">
            <img src="/icons/logo.svg" alt="logo silicit" class="logo__image" />
            <span class="silicit" :class="{ hidden: util_store.is_mobile }"
                >SILICIT</span
            >
        </RouterLink>
        <div class="buttons">
            <RouterLink
                to="/dashboard"
                class="button__action"
                v-if="user_store.token"
                >Ver Dashboard</RouterLink
            >
            <RouterLink to="/acceder" class="button__action" v-else>
                Acceder
            </RouterLink>
            <button
                class="button__pasive"
                @click="user_store.logout"
                v-if="user_store.token"
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
    transition: transform 0.5s ease;
    box-sizing: border-box;
    z-index: 100;

    &.hidden {
        transform: translateY(-100%);
    }

    &.bg__color {
        background-color: var(--color-primary);
    }

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

    .silicit {
        &.hidden {
            display: none;
        }
    }

    &:hover {
        color: var(--color-tertiary);
        transform: scale(1.05);
    }
}

@media screen and (max-width: 768px) {
    header {
        padding: 1rem 2rem;

        .logo {
            font-size: 1.5rem;

            .logo__image {
                width: 2.5rem;
                height: 2.5rem;
            }
        }

        .buttons {
            gap: 0.5rem;
            box-sizing: border-box;

            .button__action {
                font-size: 0.8rem;
            }

            .button__pasive {
                font-size: 0.8rem;
            }
        }
    }
}
</style>
