<script setup lang="ts">
//Import tools
import { IJob } from '@/interfaces/IJobs';
import { useUtilStore } from '@/stores/util-store';

const props = defineProps<{
    data: IJob;
}>();

//Data
const utilStore = useUtilStore();
</script>

<template>
    <div class="modal__job">
        <h3 class="modal__title">
            {{ props.data?.title }} por
            <span>{{ props.data?.company }}</span>
        </h3>
        <p class="modal__description">{{ props.data?.description }}</p>
        <div class="modal__info__container">
            <p
                class="modal__info__video"
                v-html="props.data?.video_small"
                v-if="utilStore.is_mobile"
            ></p>
            <p
                class="modal__info__video"
                v-html="props.data?.video_large"
                v-else
            ></p>

            <div class="modal__info__other">
                <p class="modal__price">
                    Precio:
                    <span class="modal__price__complete">
                        {{ props.data?.price }} USD
                    </span>
                    <span class="modal__price__good">10 USD</span>
                </p>
                <p class="modal__date">Inicio: {{ props.data?.start_date }}</p>
                <p class="modal__location">Lugar: {{ props.data?.location }}</p>
                <p class="modal__salary">
                    Salario aproximado: {{ props.data?.salary }}/mes
                </p>
            </div>
        </div>
        <a :href="props.data?.url" class="button__action">Apuntarme</a>
    </div>
</template>

<style scoped lang="scss">
.modal__job {
    width: 70%;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 0 1rem rgba(255, 255, 255, 0.5);

    .modal__title {
        font-size: 2rem;
        margin: 0;
        text-align: center;

        span {
            font-weight: 700;
            color: var(--color-accent);
        }
    }

    .modal__description {
        width: 60%;
        font-size: 1.25rem;
        margin: 0 auto 1rem;
        text-align: center;
        opacity: 0.65;
    }

    .modal__info__container {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .modal__info__video {
            margin: 0;
        }

        .modal__info__other {
            display: flex;
            flex-direction: column;
            gap: 1rem;

            p {
                width: 100%;
                text-align: center;
                margin: 0 auto;
                padding: 1rem 0.5rem;
                font-size: 1rem;
                border-radius: 1rem;
                box-shadow: 0 0 0.5rem rgba(255, 255, 255, 0.3);
            }

            .modal__price {
                .modal__price__complete {
                    text-decoration: line-through;
                }

                .modal__price__good {
                    color: var(--color-accent);
                }
            }
        }
    }

    .button__action {
        width: 50%;
        margin: 2rem auto 0;
    }
}

@media screen and (max-width: 768px) {
    .modal__job {
        width: 90%;
        height: 90vh;
        padding: 1rem;

        .modal__title {
            font-size: 1.5rem;
        }

        .modal__description {
            width: 80%;
            font-size: 1rem;
        }

        .modal__info__container {
            flex-direction: column;
            gap: 1rem;

            .modal__info__video {
                margin: 0 auto;
            }

            .modal__info__other {
                p {
                    padding: 0.5rem 0.25rem;
                    font-size: 0.75rem;
                }
            }
        }

        .button__action {
            width: 80%;
        }
    }
}
</style>
