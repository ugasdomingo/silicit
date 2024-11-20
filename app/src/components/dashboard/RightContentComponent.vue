<script setup lang="ts">
//Import tools
import { ref } from 'vue';

//Import components
import DisplayJobsComponent from './DisplayJobsComponent.vue';
import DisplayEventsComponent from './DisplayEventsComponent.vue';
import DisplayPlatziFamilyComponent from './DisplayPlatziFamilyComponent.vue';

//Use tools
const current_action = ref<string | null>(null);
const actions = [
    {
        title: 'Aprender un oficio en 3 semanas',
        action: 'learn_job'
    },
    {
        title: 'Apuntarme a un evento',
        action: 'event_apointment'
    },
    {
        title: 'Unirme a grupo de Platzi Family',
        action: 'enjoy_platzi'
    }
];
</script>

<template>
    <section class="right">
        <h3 class="right__title">¿Qué quiere hacer hoy?</h3>
        <div class="right__acctions">
            <button
                class="button"
                v-for="action in actions"
                :key="action.action"
                @click="current_action = action.action"
            >
                {{ action.title }}
            </button>
        </div>
        <div :class="current_action ? 'right__display' : 'hidden'">
            <DisplayJobsComponent v-if="current_action === 'learn_job'" />
            <DisplayEventsComponent
                v-else-if="current_action === 'event_apointment'"
            />
            <DisplayPlatziFamilyComponent
                v-else-if="current_action === 'enjoy_platzi'"
            />
        </div>
    </section>
</template>

<style scoped lang="scss">
.right {
    width: 60%;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
    border-radius: 1rem;
    background-color: var(--color-bg-transparent);
    backdrop-filter: blur(0.4rem);
    box-shadow: 0 0 0.5rem rgba(255, 255, 255, 0.3);
    box-sizing: border-box;
    transition: all 2s;

    .right__title {
        font-size: 1.5rem;
        font-weight: bold;
        margin: 0 0 1rem;
        padding: 0;
        text-align: center;
    }

    .right__acctions {
        height: 10%;
        display: flex;
        gap: 1rem;
        justify-content: center;
        box-sizing: border-box;
        overflow: hidden;

        .button {
            font-size: 0.75rem;
        }

        .button:last-child {
            background-color: transparent;
            color: var(--color-accent);
            border: 1px solid var(--color-accent);
        }
    }

    .right__display {
        height: 70%;
        justify-content: space-between;
        margin: 2rem 0 0;
    }

    .hidden {
        display: none;
        height: 0;
        overflow: hidden;
    }
}

@media screen and (max-width: 768px) {
    .right {
        width: 100%;
        height: 100%;
        margin: 0 0 1rem;

        .right__acctions {
            flex-direction: column;
            gap: 0.25rem;
        }
    }
}
</style>
