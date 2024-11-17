<script setup lang="ts">
//Import tools
import { ref } from 'vue';

//Data
const show_platzi_video = ref(false);
</script>

<template>
    <section class="platzi">
        <h2>Estudia en Platzi con Expert Family</h2>
        <div class="content-container">
            <div class="left-content">
                <p>
                    Platzi tiene un plan anual para 4 estudiantes que llama
                    "Platzi Family", con este plan es más económico estudiar en
                    Platzi. Mira cuánto paga cada estudiante por cada plan:
                </p>
                <ul>
                    <li>Platzi Expert: 249,00$ por estudiante</li>
                    <li>Platzi Duo: 164,50$ por estudiante</li>
                    <li>Platzi Family: 124,25$ por estudiante</li>
                </ul>
                <p>
                    Pero lo complicado es que puedas conseguir 3 personas más
                    para compartir el plan. En Silicit hemos creado un sistema
                    para organizar grupos de 4 y que puedan estudiar en platzi a
                    un precio más bajo.
                </p>
            </div>
            <div class="right-content">
                <article class="platzi-video" v-if="show_platzi_video">
                    <iframe
                        width="392"
                        height="220.50"
                        src="https://www.youtube-nocookie.com/embed/x4PU6pGEDWw?si=BCXxMNGNzkgbXf0t"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                    ></iframe>
                </article>
                <button
                    class="button__pasive"
                    v-else
                    @click="show_platzi_video = true"
                >
                    Saber cómo funciona
                </button>
                <RouterLink to="/acceder" class="button__action"
                    >Unirme a Silicit</RouterLink
                >
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.platzi {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0;
    margin: 0;
    box-sizing: border-box;

    h2 {
        margin-bottom: 3rem;
        color: var(--color-accent);
        text-align: center;
    }

    .content-container {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;

        .left-content {
            width: 50%;
            margin: 0;
            text-align: left;

            p {
                margin-bottom: 1rem;
            }

            ul {
                margin-bottom: 1rem;
                padding-left: 1rem;
            }
        }

        .right-content {
            width: 50%;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;

            .platzi-video {
                margin-top: 1rem;
            }
        }
    }
}
</style>
