<script setup lang="ts"></script>

<template>
    <main class="pages">
        <h2>Consigue <span>1 año de Platzi gratis</span> en Silicit</h2>
        <p>
            En Silicit, a partir de 2025, cada trimestre regalaremos 4 plazas
            para estudiar en Platzi usando el "Plan Family": 3 plazas las
            repartimos entre afiliados con membresía "Be Professional" y 1 plaza
            entre los que tienen la membresía "Make Money".
        </p>
        <p>
            Adicionalmente nuestros afiliados con "Be Professional" pueden
            aprovechar nuestro sistema de grupos que permite estudiar 1 año en
            Platzi pagando 50% menos.
        </p>
        <section class="how__participate">
            <h2>¿Cómo participar?</h2>
            <ol>
                <li>
                    <p>
                        Regístrate en Silicit con la membresía que más te
                        convenga. Recuerda que la membresía "Be Professional" te
                        permite participar cada trimestre por 3 plazas y "Make
                        Money" solo por 1 plaza.
                    </p>
                </li>
                <li>
                    <p>
                        Escribe un correo a info@silicit.com contándonos sobre
                        ti y porqué quieres estudiar en Platzi o sacar una
                        carrera digital.
                    </p>
                </li>
                <li>
                    <p>
                        El 22 de Febrero de 2025 publicaremos los ganadores en
                        nuestra web.
                    </p>
                </li>
            </ol>
        </section>
        <section class="testimonials">
            <h3>Ellos ya estudiaron en Platzi gracias a SIlicit</h3>
            <div class="carousel">
                <img
                    src="https://res.cloudinary.com/minteados/image/upload/v1739110362/silicit/testimonios/Estudiante_1_rjueqe.webp"
                    alt="testimonio 1"
                    class="img"
                /><img
                    src="https://res.cloudinary.com/minteados/image/upload/v1739110362/silicit/testimonios/Estudiante_3_va9phn.webp"
                    alt="testimonial 2"
                    class="img"
                /><img
                    src="https://res.cloudinary.com/minteados/image/upload/v1739110362/silicit/testimonios/Estudiante_2_q9g8pb.webp"
                    alt="testimonial 3"
                    class="img"
                />
            </div>
        </section>
        <section class="call-to-action">
            <h3>¿Listo para estudiar en Platzi?</h3>
            <RouterLink to="/acceder" class="button__action"
                >Registrarme</RouterLink
            >
        </section>
    </main>
</template>

<style scoped lang="scss">
.pages {
    display: flex;
    flex-direction: column;

    h2 {
        margin: 1rem 0;

        span {
            color: var(--color-accent);
        }
    }

    p {
        width: 70%;
    }

    .how__participate {
        margin: 2rem 0;
        width: 100%;

        h2 {
            font-size: 1.5rem;
            margin: 1rem 0;
        }

        ol {
            list-style-type: decimal;
            margin: 1rem 0;

            li {
                font-size: 1rem;
                margin: 0.5rem 0;
            }
        }
    }

    .testimonials {
        width: 100%;
        margin: 2rem 0;

        h3 {
            color: var(--color-accent);
            margin: 1rem 0;
        }

        .carousel {
            display: flex;
            justify-content: space-between;
            width: 100%;

            .img {
                border-radius: 0.5rem;
                height: 10rem;
                width: 30%;
                object-fit: cover;
            }
        }
    }

    .call-to-action {
        width: 100%;
        margin: 2rem 0;

        h3 {
            font-size: 1.5rem;
            margin: 1rem 0;
        }

        a {
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
            font-size: 1rem;
            margin: 0;
        }
    }
}

@media (max-width: 768px) {
    .pages {
        margin-top: 2rem;
        p {
            width: 100%;
        }

        .how__participate {
            ol {
                li {
                    font-size: 0.8rem;
                }
            }
        }

        .testimonials {
            .carousel {
                flex-direction: column;
                gap: 0.3rem;
                .img {
                    height: fit-content;
                    width: 100%;
                }
            }
        }

        .call-to-action {
            h3 {
                font-size: 1.2rem;
            }

            a {
                font-size: 0.8rem;
            }
        }
    }
}
</style>
