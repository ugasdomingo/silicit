<script setup lang="ts">
//Import tools
import { ref, onBeforeMount, onUnmounted } from 'vue';
import { steps } from '@/static/silicit-path';

//Data
const current_step = ref(1);
const number_px_icon = ref(4);

//Methods
const screen_size = () => {
    if (window.innerWidth <= 768) {
        number_px_icon.value = 4;
    } else {
        number_px_icon.value = 8;
    }
};

const show_step = (step: number) => {
    current_step.value = step;
};

//Lifecycle
onBeforeMount(() => {
    screen_size();
    window.addEventListener('resize', screen_size);
});

onUnmounted(() => {
    window.removeEventListener('resize', screen_size);
});
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
                src="/icons/logo.svg"
                alt="icono-usuario"
                class="progress__icon"
                :style="{
                    transform: `translateX(${current_step * number_px_icon}rem)`
                }"
            />
            <div class="progress__bar">
                <article
                    :class="current_step === 1 ? 'Active' : ''"
                    @click="show_step(1)"
                >
                    Paso 1
                </article>
                <article
                    :class="current_step === 2 ? 'Active' : ''"
                    @click="show_step(2)"
                >
                    Paso 2
                </article>
                <article
                    :class="current_step === 3 ? 'Active' : ''"
                    @click="show_step(3)"
                >
                    Paso 3
                </article>
                <article
                    :class="current_step === 4 ? 'Active' : ''"
                    @click="show_step(4)"
                >
                    Paso 4
                </article>
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
                cursor: pointer;
            }
        }
    }
}

@media screen and (max-width: 768px) {
    .silicit__path {
        justify-content: space-between;
        padding: 4rem 1rem;
        .description {
            width: 90%;
        }

        .carousel {
            height: 70%;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 0.5rem 0;
            gap: 0.5rem;

            .carousel__item {
                height: 100%;
                flex-direction: column;
                justify-content: space-between;
                gap: 0.5rem;
                padding: 0;

                .left-information {
                    width: 100%;
                    text-align: center;
                }

                .right-information {
                    width: 100%;
                    justify-content: center;
                }
            }
        }

        .progress__indicator {
            position: relative;
            justify-content: center;
            box-sizing: border-box;
            .progress__icon {
                display: none;
            }
            .progress__bar {
                width: 100%;
                gap: 0.5rem;
                box-sizing: border-box;

                article {
                    font-size: 0.9rem;
                    width: 3rem;
                    height: 2rem;
                    transition: all 0.75s;
                }

                article.Active {
                    background-color: var(--color-accent);
                    color: white;
                }
            }
        }
    }
}
</style>
