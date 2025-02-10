<script setup lang="ts"></script>

<template>
    <section class="error__container">
        <h1>404</h1>
        <p>Lo sentimos, la página que buscas no existe.</p>
    </section>
</template>

<style scoped lang="scss">
.error__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-size: 2rem;

    h1 {
        font-size: 5rem;
        margin: 0;
        color: var(--color-accent);
    }

    p {
        font-size: 1.5rem;
        margin: 0;
        color: var(--color-white);
    }
}
</style>
