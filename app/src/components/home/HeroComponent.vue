<script setup lang="ts">
//Down 100vh to the next section
const scroll_next_section = () => {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
};
</script>

<template>
    <section class="hero">
        <h1>
            Conviértete en Profesional <br />
            <span>de tecnología u otra carrera digital</span>
        </h1>
        <h4>
            Si te faltan recursos para entrar en la Universidad o para hacer una
            formación profesional, nosotros te ayudamos a conseguir un camino
            para formarte como profesional.
        </h4>
        <button class="button" @click="scroll_next_section">
            Descubre cómo
        </button>
    </section>
</template>

<style scoped lang="scss">
.hero {
    width: 60%;
    height: calc(100vh - 5rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 0;
    margin: 0 auto;
    box-sizing: border-box;

    h1 {
        margin-bottom: 1.5rem;
        line-height: 0.7;

        span {
            font-size: 2.25rem;
            opacity: 0.5;
            margin: 0;
        }
    }

    h4 {
        margin-top: 1rem;
        font-weight: 300;
        letter-spacing: 0.1rem;
    }

    .button {
        width: 50%;
        margin-top: 2rem;
        border: 1px solid var(--color-accent);
        border-radius: 0.5rem;
        background-color: transparent;
        color: var(--color-accent);
        transition: all 0.3s;
        align-self: center;

        &:hover {
            background-color: var(--color-tertiary);
        }
    }
}

@media screen and (max-width: 768px) {
    .hero {
        width: 90%;

        h1 {
            line-height: 0.9;
        }
    }
}
</style>
