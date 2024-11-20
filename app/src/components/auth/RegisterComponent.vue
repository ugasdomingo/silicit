<script setup lang="ts">
//Import tools
import { ref, onBeforeMount } from 'vue';
import { useUserStore } from '@/stores/user-store';

const props = defineProps<{
    membershipType: string;
}>();

//Variables
const userStore = useUserStore();
const name = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const policy_accepted = ref(false);
const membership_type = ref('');
const show_renew = ref(false);

//Methods
onBeforeMount(() => {
    props.membershipType === 'make-money'
        ? (membership_type.value = 'Make money')
        : props.membershipType === 'be-professional'
        ? (membership_type.value = 'Be professional')
        : (membership_type.value = 'Investor');
});
const register = async () => {
    await userStore.register(
        name.value,
        email.value,
        phone.value,
        password.value,
        policy_accepted.value,
        membership_type.value
    );
};
const validate_renew = async () => {
    await userStore.login(email.value, password.value);
    await userStore.renew_membership();
};
</script>

<template>
    <section class="register">
        <h2>
            Afiliación con <span>{{ membership_type }}</span>
        </h2>
        <input type="text" v-model="name" placeholder="Nombre" />
        <input type="email" v-model="email" placeholder="Email" />
        <input type="tel" v-model="phone" placeholder="Teléfono" />
        <input type="password" v-model="password" placeholder="Contraseña" />
        <div class="policy">
            <input type="checkbox" v-model="policy_accepted" />
            <label>
                Acepto la
                <RouterLink to="/privacidad">política de privacidad</RouterLink>
                y los
                <RouterLink to="/terminos-condiciones">
                    términos y condiciones
                </RouterLink>
            </label>
        </div>
        <button class="button__action" @click="register" v-if="policy_accepted">
            Registrarse
        </button>
        <aside
            class="renew__container"
            :class="{ hidden: props.membershipType === 'make-money' }"
        >
            <h3>¿Estas renovando tu membresía?</h3>
            <div class="login__and__renew" v-if="show_renew">
                <input type="email" v-model="email" placeholder="Email" />
                <input
                    type="password"
                    v-model="password"
                    placeholder="Contraseña"
                />
                <button class="button__pasive" @click="validate_renew">
                    Pulsa aquí para validar
                </button>
            </div>
            <button class="button__pasive" v-else @click="show_renew = true">
                SI
            </button>
        </aside>
    </section>
</template>

<style lang="scss" scoped>
.register {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
    input {
        margin: 1rem 0 0;
        padding: 1rem;
        border-radius: 1rem;
        border: 1px solid #ccc;
    }
    label {
        margin: 1rem 0 0;
        input {
            margin-right: 1rem;
        }
    }
    button {
        margin-top: 2rem;
    }
    span {
        color: var(--color-accent);
    }
    a {
        color: var(--color-accent);
        opacity: 0.8;
        text-decoration: none;
    }

    .renew__container {
        width: 20%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        position: fixed;
        top: 30vh;
        right: 4rem;
        border-radius: 1rem;
        box-shadow: 0 0 1rem rgba(255, 255, 255, 0.3);

        &.hidden {
            display: none;
        }

        h3 {
            font-size: 1rem;
            margin: 0;
            padding: 0;
            text-align: center;
        }

        .login__and__renew {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 1rem;
        }

        input {
            margin: 0;
            padding: 0.5rem;
            font-size: 0.75rem;
            border-radius: 1rem;
            border: 1px solid #ccc;
        }

        button {
            font-size: 0.75rem;
            margin: 0;
        }

        &:hover {
            transform: scale(1.1);
        }
    }
}

@media screen and (max-width: 768px) {
    .register {
        width: 100%;
        height: fit-content;
        min-height: 100vh;
        padding: 1rem;
        box-sizing: border-box;
        input {
            width: 70%;
        }
        .policy {
            display: flex;
            gap: 0;
            justify-content: center;
            align-items: center;

            label {
                font-size: 0.75rem;
            }
            input {
                width: 2rem;
                height: 2rem;
                margin-right: 0.5rem;
            }
        }
        button {
            width: 50%;
        }
        .renew__container {
            width: 100%;
            margin-top: 2rem;
            position: inherit;
            box-sizing: border-box;

            .login__and__renew {
                width: 100%;
                input {
                    width: 60%;
                }
                button {
                    width: 50%;
                }
            }
        }
    }
}
</style>
