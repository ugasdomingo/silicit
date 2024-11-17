<script setup lang="ts">
//Import tools
import { ref } from 'vue';
import { steps } from '@/static/silicit-path';

//Data
const current_step = ref(1);

//Methods
const showStep = (step: number) => {
    current_step.value = step;
};
</script>

<template>
    <section class="silicit__path">
        <h2 class="title">
            Sé un profesional con el <span>Camino Silicit</span>
        </h2>
        <p class="description">
            Un camino que se adapta a tu edad, necesidad de ingresos y
            disponibilidad de tiempo.
        </p>
        <div class="carousel">
            <article class="carousel__item">
                <section class="left-information">
                    <h4 class="carousel__item__title">
                        {{ steps[current_step - 1].title }}
                    </h4>
                    <p class="carousel__item__description">
                        {{ steps[current_step - 1].description }}
                    </p>
                </section>
                <section class="right-information">
                    <p v-html="steps[current_step - 1].video"></p>
                </section>
            </article>
        </div>
        <div class="progress__indicator">
            <img
                src="/icons/vite.svg"
                alt="icono-usuario"
                class="progress__icon"
                :style="{ transform: `translateX(${current_step * 8}rem)` }"
            />
            <div class="progress__bar">
                <article @click="showStep(1)">Paso 1</article>
                <article @click="showStep(2)">Paso 2</article>
                <article @click="showStep(3)">Paso 3</article>
                <article @click="showStep(4)">Paso 4</article>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.silicit__path {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4rem 0 1rem;
    box-sizing: border-box;

    .title {
        text-align: center;
        margin: 0;

        span {
            color: var(--color-accent);
        }
    }

    .description {
        width: 70%;
        text-align: center;
        margin: 0 auto 3rem;
        opacity: 0.6;
    }

    .carousel {
        width: 100%;
        height: 50%;
        display: flex;
        gap: 1rem;
        padding: 1rem;
        overflow: hidden;
        border-top: 1px solid var(--color-accent);
        border-bottom: 1px solid var(--color-accent);
        border-radius: 1rem;
        box-sizing: border-box;

        .carousel__item {
            width: 100%;
            display: flex;
            gap: 1rem;

            .left-information {
                width: 50%;
                display: flex;
                flex-direction: column;
                justify-content: center;

                .carousel__item__title {
                    color: var(--color-accent);
                    margin-top: 0;
                }

                .carousel__item__description {
                    margin: 0;
                }
            }

            .right-information {
                width: 50%;
                display: flex;
                justify-content: right;
                align-items: center;
            }
        }
    }

    .progress__indicator {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin: 1rem auto 0;

        .progress__icon {
            width: 2rem;
            height: 2rem;
            transition: transform 1.25s;
        }

        .progress__bar {
            display: flex;
            gap: 1rem;

            article {
                width: 6rem;
                height: 3rem;
                display: flex;
                align-items: center;
                border: 1px solid var(--color-accent);
                border-radius: 1rem;
                padding-left: 1rem;
            }
        }
    }
}
</style>
