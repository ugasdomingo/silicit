<script setup lang="ts"></script>

<template>
    <section class="plans">
        <article class="make-money">
            <h3>Make Money</h3>
            <p class="subtitle">Aprende un oficio</p>
            <h4 class="price">0,00 USD</h4>
            <p class="duration">6 meses</p>
            <div class="benefits">
                <h4>Beneficios</h4>
                <ul>
                    <li>Descuentos en formación oficios</li>
                    <li class="item-disabled">
                        Apuntarse a un grupo de Platzi Family
                    </li>
                    <li>Mentoría mensual</li>
                    <li>Acceso a eventos</li>
                    <li>Acceso a la comunidad</li>
                </ul>
            </div>
            <a href="#" class="button__action">Afiliarme</a>
        </article>
        <article class="be-professional">
            <h3>Be Professional</h3>
            <p class="subtitle">Conviértete en profesional</p>
            <h4 class="price">9,90 USD</h4>
            <p class="duration">12 meses</p>
            <div class="benefits">
                <h4>Beneficios</h4>
                <ul>
                    <li>Descuentos en formación oficios</li>
                    <li>Apuntarse a un grupo de Platzi Family</li>
                    <li>Acceso a eventos</li>
                    <li>Acceso a la comunidad</li>
                    <li>Mentoría semanal</li>
                    <li>Acceso a la comunidad</li>
                    <li>Acceso a proyectos</li>
                </ul>
            </div>
            <a href="#" class="button__action">Afiliarme</a>
        </article>
        <article class="investor">
            <h3>Investor</h3>
            <p class="subtitle">Invierte en proyectos</p>
            <h4 class="price">100,00 USD</h4>
            <p class="duration">12 meses</p>
            <div class="benefits">
                <h4>Beneficios</h4>
                <ul>
                    <li>Acceso a eventos</li>
                    <li>Acceso a la comunidad</li>
                    <li>Mentoría semanal</li>
                    <li>Acceso a la comunidad</li>
                    <li>Acceso a proyectos</li>
                </ul>
            </div>
            <a href="#" class="button__action">Afiliarme</a>
        </article>
    </section>
</template>

<style lang="scss" scoped>
.plans {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    gap: 2.5rem;
    box-sizing: border-box;

    article {
        width: 20%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        border-radius: 1rem;
        box-shadow: 0 0 1rem rgba(255, 255, 255, 0.1);
        h3 {
            font-size: 1.5rem;
            margin: 0;
        }
        .subtitle {
            font-size: 1rem;
            margin: 0;
            opacity: 0.5;
        }
        .price {
            font-size: 1.5rem;
            margin: 0.5rem 0 0;
            color: var(--color-accent);
        }
        .duration {
            margin: 0;
            opacity: 0.5;
            font-size: 1rem;
        }
        .benefits {
            margin: 1rem 0;
            h4 {
                font-size: 1rem;
                color: var(--color-accent);
                margin: 0;
            }
            ul {
                list-style: none;
                padding: 0;
                margin: 0;
                li {
                    margin: 0.5rem 0;
                    &.item-disabled {
                        color: var(--color-disabled);
                        text-decoration: line-through;
                    }
                }
            }
        }
        a {
            margin: 1rem 0 0;
        }
    }
}
</style>
