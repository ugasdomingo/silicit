<script setup lang="ts">
//Import tools
import { useUtilStore } from '@/stores/util-store';

//Data
const util_store = useUtilStore();
</script>

<template>
    <section class="plans">
        <article class="make-money">
            <h3>Make Money</h3>
            <p class="subtitle">Aprende un oficio</p>
            <h4 class="price">0,00 USD</h4>
            <p class="duration">6 meses (No renovable)</p>
            <div class="benefits" :class="{ hidden: util_store.is_mobile }">
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
            <RouterLink to="/registro/make-money" class="button__action">
                Afiliarme
            </RouterLink>
        </article>
        <article class="be-professional">
            <h3>Be Professional</h3>
            <p class="subtitle">Conviértete en profesional</p>
            <h4 class="price">9,99 USD</h4>
            <p class="duration">12 meses</p>
            <div class="benefits" :class="{ hidden: util_store.is_mobile }">
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
            <a
                href="https://www.paypal.com/ncp/payment/4K4JMFTVPC57C"
                class="button__action"
                >Afiliarme</a
            >
        </article>
        <article class="investor">
            <h3>Investor</h3>
            <p class="subtitle">Invierte en proyectos</p>
            <h4 class="price">100,00 USD</h4>
            <p class="duration">12 meses</p>
            <div class="benefits" :class="{ hidden: util_store.is_mobile }">
                <h4>Beneficios</h4>
                <ul>
                    <li>Acceso a eventos</li>
                    <li>Acceso a la comunidad</li>
                    <li>Mentoría semanal</li>
                    <li>Acceso a la comunidad</li>
                    <li>Acceso a proyectos</li>
                </ul>
            </div>
            <a href="#" class="button__action">Solicitar</a>
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

            &.hidden {
                display: none;
            }
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

@media screen and (max-width: 768px) {
    .plans {
        flex-direction: column;
        gap: 1rem;
        padding: 2rem 1rem 0;
        article {
            width: 90%;
        }
    }
}
</style>
