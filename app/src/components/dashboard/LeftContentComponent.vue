<script setup lang="ts">
//Import tools
import { ref, onBeforeMount } from 'vue';
import { useUserStore } from '@/stores/user-store';
import { phrases } from '@/static/motivating-phrases';

//Use tools
const user_store = useUserStore();
const all_goals = ref();
const message = ref('');

//Methods
const get_random_phrase = () => {
    const random_index = Math.floor(Math.random() * phrases.length);
    message.value = phrases[random_index];

    setTimeout(() => {
        get_random_phrase();
    }, 20000);
};

//Lifecycle
onBeforeMount(async () => {
    await user_store.get_all_goals();
    all_goals.value = user_store.all_goals;
    get_random_phrase();
});
</script>

<template>
    <section class="left">
        <div class="user__info">
            <h3 class="user__info__saludo">Hola, {{ user_store.user_name }}</h3>
            <p class="user__info__message">
                {{ message }}
            </p>
            <p class="user__info__points">
                Puntos ganados:
                {{ user_store.user_history?.acumulated_points }}
            </p>
            <p class="user__info__points">
                Disponibles para canjear:
                <span>{{ user_store.user_history?.acumulated_points }}</span>
            </p>
        </div>
        <div class="user__goals">
            <h3 class="user__goals__title">Metas Pendientes</h3>
            <div class="user__goals__display">
                <p
                    class="user__goals__display__goal"
                    v-for="goal in all_goals"
                    :key="goal._id"
                    :class="
                        user_store.user_history?.goals_achieved.includes(
                            goal._id
                        )
                            ? 'goal__completed'
                            : 'goal__pending'
                    "
                >
                    {{ goal.goal_name }} - {{ goal.points }} puntos
                </p>
            </div>
        </div>
        <div class="user__history">
            <h3 class="user__history__title">Historial de Puntos Ganados</h3>
            <div class="user__history__display">
                <p
                    class="user__history__display__item"
                    v-for="item in user_store.user_history?.points_won"
                    :key="item._id"
                >
                    {{ item.reason }} - {{ item.points }} puntos
                </p>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.left {
    width: 35%;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0;
    padding: 0;
    gap: 0.5rem;
    box-sizing: border-box;

    .user__info {
        margin: 0;
        padding: 1rem;
        border-radius: 1rem;
        background-color: var(--color-bg-transparent);
        backdrop-filter: blur(0.4rem);
        box-shadow: 0 0 0.5rem rgba(255, 255, 255, 0.3);

        .user__info__saludo {
            font-size: 1.5rem;
            font-weight: bold;
            margin: 0;
        }

        .user__info__message {
            font-size: 1rem;
            margin: 0 0 1rem;
            color: var(--color-accent);
        }

        .user__info__points {
            font-size: 1rem;
            margin: 0;

            span {
                font-weight: bold;
                color: var(--color-accent);
            }
        }
    }

    .user__goals {
        height: 20vh;
        overflow-y: scroll;
        scrollbar-width: thin;
        scrollbar-color: transparent transparent;
        margin: 0;
        padding: 1rem;
        border-radius: 1rem;
        background-color: var(--color-bg-transparent);
        backdrop-filter: blur(0.4rem);
        box-shadow: 0 0 0.5rem rgba(255, 255, 255, 0.3);

        .user__goals__title {
            font-size: 1.25rem;
            margin: 0 0 0.25rem;
        }

        .user__goals__display {
            display: flex;
            flex-direction: column;
            font-size: 1rem;
            margin: 0;

            p {
                font-size: 0.75rem;
                margin: 0 0 0.25rem;
                padding: 0.5rem 0 0.5rem 1rem;
                border-radius: 4rem;
                background-color: var(--color-bg-transparent);
            }

            .goal__completed {
                color: var(--color-accent);
                text-decoration: line-through;
                box-shadow: 0 0 0.5rem rgba(255, 255, 255, 0.3);
            }

            .goal__pending {
                opacity: 0.5;
            }
        }
    }

    .user__history {
        height: 20vh;
        overflow-y: scroll;
        scrollbar-width: thin;
        scrollbar-color: transparent transparent;
        margin-top: 1rem;
        padding: 1rem;
        border-radius: 1rem;
        background-color: var(--color-bg-transparent);
        backdrop-filter: blur(0.4rem);
        box-shadow: 0 0 0.5rem rgba(255, 255, 255, 0.3);

        .user__history__title {
            font-size: 1.25rem;
            margin: 0 0 0.25rem;
        }

        .user__history__display {
            font-size: 1rem;
            margin: 0;

            .user__history__display__item {
                font-size: 0.75rem;
                margin: 0 0 0.25rem;
                padding: 0.5rem 0 0.5rem 1rem;
                border-radius: 4rem;
                background-color: var(--color-bg-transparent);
            }
        }
    }
}

@media screen and (max-width: 768px) {
    .left {
        width: 100%;
        height: 100%;
        gap: 1rem;
        margin: 3rem 0 1rem;

        .user__info {
            padding: 1rem 0.5rem;
        }

        .user__goals {
            padding: 1rem 0.5rem;
        }

        .user__history {
            padding: 1rem 0.5rem;
        }
    }
}
</style>
