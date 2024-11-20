<script setup lang="ts"></script>

<template>
    <section class="events__container">
        <h2>Próximamente</h2>
        <p>Estamos preparando la agenda de eventos</p>
    </section>
</template>

<style scoped lang="scss">
.events__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 4rem;

    h2 {
        font-size: 2rem;
        font-weight: 700;
        color: var(--color-text);
    }

    p {
        font-size: 1.5rem;
        font-weight: 400;
        color: var(--color-text);
    }
}

@media screen and (max-width: 768px) {
    .events__container {
        p {
            text-align: center;
        }
    }
}
</style>
