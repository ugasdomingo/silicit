<script setup lang="ts"></script>

<template>
    <main class="pages">
        <h1>¿Qué es Silicit y en qué te ayuda?</h1>
        <p>
            Silicit es una empresa de potenciación educativa, nuestra meta es
            que personas que no tienen posibilidades de entrar a la Universidad
            o formarse profesionalmente en tecnología o carreras de la industria
            digital, lo hagan.
        </p>
        <h3>¿Cómo te ayudamos?</h3>
        <p>
            Primero que todo, nosotros no te damos la formación, sino que te
            ayudamos a encontrar la mejor manera de formarte en el área que
            quieres, tomando en cuenta tu situación económicas y herramientas
            disponibles.
        </p>
        <p>
            Y para eso creamos el <span>Camino Silicit</span>. Un "manual" para
            ser profesional que se basa en 3 pilares fundamentales:
        </p>
        <ul>
            <li>Aprender un oficio</li>
            <li>Adquirir o Mejorar tus herramientas de trabajo</li>
            <li>Crear tu Portafolio Profesional</li>
        </ul>
        <p>
            Además, no estarás solo en este camino, tendrás la oportunidad de
            conocer y asociarte con otros futuros profesionales, empresas e
            inversionistas de la industria.
            <RouterLink to="/">Conoce más sobre el Camino Silicit</RouterLink>.
        </p>
        <section class="mision">
            <h3>Nuestra Misión</h3>
            <p>
                Es que todas las personas que quieran formarse profesionalmente
                en tecnología o carreras de la industria digital, lo hagan, sin
                importar sus condiciones económicas o familiares. Facilitandoles
                acceso a formación de calidad, herramientas de trabajo y
                contactos con empresas e inversionistasla industria.
            </p>
        </section>
        <section class="vision">
            <h3>Nuestra Visión</h3>
            <p>
                Es tener varios nucleos de formación y crecimiento tecnológico
                en cada país de América y Europa. Donde personas sin acceso a
                computadoras o fondo económico, puedan formarse
                profesionalmente, trabajar y emprender en lo que les apasiona.
                Fomentando los contactos entre empresas, profesionales y fondos
                de inversión.
            </p>
        </section>
    </main>
</template>

<style lang="scss" scoped>
h1 {
    margin: 0 0 2rem;
    text-align: center;
}

h3 {
    margin: 1rem 0;
}

p {
    margin-bottom: 1rem;
}

ul {
    margin-bottom: 1rem;
}

li {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: var(--color-accent);
}

a {
    color: var(--color-accent);
    font-weight: bold;
}

span {
    color: var(--color-accent);
    font-weight: bold;
}

.mision {
    width: 60%;
    padding: 0.5rem 1rem;
    margin: 2rem 0 0 auto;
    border: 4px solid var(--color-white);
    border-radius: 1rem;
    background-color: var(--color-primary);

    h3 {
        color: var(--color-white);
    }

    p {
        opacity: 0.8;
    }
}
.vision {
    width: 60%;
    padding: 0.5rem 1rem;
    margin: 2rem auto 2rem 0;
    border: 4px solid var(--color-white);
    border-radius: 1rem;
    background-color: var(--color-primary);

    h3 {
        color: var(--color-white);
    }

    p {
        opacity: 0.8;
    }
}
</style>
