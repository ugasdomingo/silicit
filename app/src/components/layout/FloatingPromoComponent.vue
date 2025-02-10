<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
    <section class="promo__container">
        <p>Consigue 1 año de Platzi gratis</p>
        <RouterLink to="/promociones" class="button__action">
            Participar
        </RouterLink>
    </section>
</template>

<style scoped lang="scss">
.promo__container {
    position: fixed;
    bottom: 3rem;
    right: 0;
    width: 10%;
    display: flex;
    flex-direction: column;
    background-color: var(--color-primary);
    border-radius: 10px 0 0 10px;
    padding: 1rem 3rem 1rem 1rem;

    box-shadow: 0 -2px 0.5rem rgba(0, 0, 0, 0.15);

    p {
        font-size: 1rem;
        color: var(--color-white);
        margin: 0.1rem 0 0.5rem;
    }

    a {
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        font-size: 1rem;
        margin: 0;
    }
}

@media screen and (max-width: 768px) {
    .promo__container {
        width: 50%;
        bottom: 0.5rem;
        right: 0;
        padding: 0.5rem 2rem;
    }
}
</style>
