<script setup lang="ts"></script>

<template>
    <footer>
        <p>© 2021 Silicit. Todos los derechos reservados.</p>
        <nav>
            <RouterLink to="/sobre-nosotros">¿Quienes somos?</RouterLink>
            <RouterLink to="/terminos-condiciones">
                Términos y condiciones
            </RouterLink>
            <RouterLink to="/privacidad">Política de privacidad</RouterLink>
            <RouterLink to="/aviso-legal">Aviso Legal</RouterLink>
        </nav>
    </footer>
</template>

<style scoped lang="scss">
footer {
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 4rem;
    box-sizing: border-box;
    z-index: 100;
    background-color: var(--color-primary);
    color: var(--color-tertiary);

    p {
        font-size: 1rem;
    }

    nav {
        display: flex;
        gap: 1rem;

        a {
            color: var(--color-text);
            text-decoration: none;
            font-size: 1rem;
            opacity: 0.7;

            &:hover {
                color: var(--color-accent);
            }
        }
    }
}

@media screen and (max-width: 768px) {
    footer {
        padding: 1rem;
        height: fit-content;
        background-color: var(--color-background);

        p {
            width: 50%;
            font-size: 0.8rem;
        }

        nav {
            width: 50%;
            flex-direction: column;
            align-items: flex-end;
            gap: 0.5rem;
            a {
                font-size: 0.8rem;
            }
        }
    }
}
</style>
