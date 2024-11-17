<script setup lang="ts">
//Import tools
import { ref, onBeforeMount } from 'vue';
import { usePlatziStore } from '@/stores/platzi-store';
import { useUserStore } from '@/stores/user-store';

//Activate store
const platziStore = usePlatziStore();
const userStore = useUserStore();
const user_membership_type = ref<string>('');

//Use tools
onBeforeMount(async () => {
    user_membership_type.value = userStore.user_history?.points_won.find(
        (point) => point.reason === 'Be professional'
    )
        ? 'Be professional'
        : 'Make Money';

    await platziStore.get_platzi_group();
});
</script>

<template>
    <section
        class="platzi__container"
        v-if="user_membership_type === 'Be professional'"
    >
        <div class="joined__platzi" v-if="platziStore.platzi_group">
            <h3>
                Felicidades ya te has unido a un grupo para comprar Platzi
                Family
            </h3>
            <h3>
                Perteneces al grupo: <span>{{ platziStore.platzi_group }}</span>
            </h3>
            <button class="button">Saber estado del grupo</button>
        </div>
        <div class="join__platzi" v-else>
            <h3>Únete a un grupo de Platzi Family</h3>
            <p>
                Ahorra casi un 50% en tu plan Expert con un grupo Family, El
                plan Experte de platzi tiene un costo de 250,00 USD por usuario,
                con el Plan Family queda en 124,25 USD por usuario
            </p>
            <button class="button" @click="platziStore.join_platzi_group">
                Unirme a un grupo
            </button>
        </div>
    </section>
    <section class="upgrade" v-else>
        <h3>
            ¿Quieres ser parte de un grupo para comprar Platzi Expert Family?
        </h3>
        <p>
            Conviértete en Platzi Expert y accede a todos los cursos de Platzi
            con un 50% de descuento. Sólo tienes que subir tener una membresía
            "Be Professional"
        </p>
        <RouterLink to="/acceder" class="button">
            Me interesa, adquirir membresía
        </RouterLink>
    </section>
</template>

<style scoped lang="scss">
.platzi__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    color: var(--color-text);
    border-radius: 1rem;
    box-sizing: border-box;

    .joined__platzi {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;

        h3 {
            margin: 0;
            padding: 0;
            text-align: center;

            span {
                font-weight: bold;
                color: var(--color-accent);
            }
        }
    }

    .join__platzi {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        margin: 0;

        h3 {
            font-weight: bold;
            margin: 0;
            padding: 0;
        }
    }
}

.upgrade {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: var(--color-bg-transparent);
    color: var(--color-text);
    border-radius: 1rem;
    box-sizing: border-box;

    h3 {
        font-size: 1.5rem;
        font-weight: bold;
        margin: 0 0 1rem;
        padding: 0;
        text-align: center;
    }
}
</style>
