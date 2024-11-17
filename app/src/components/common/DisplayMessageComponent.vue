<script setup lang="ts">
//Define props
defineProps<{ message: string; type: string }>();
</script>

<template>
    <div class="message" :class="type">
        <p>{{ message }}</p>
    </div>
</template>

<style scoped lang="scss">
.message {
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 0.5rem;
    font-size: 3rem;
    text-align: center;
    width: 30%;
    position: fixed;
    top: 6rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    animation: slideIn 1s ease-in-out, fadeOut 3s 2s ease-in-out forwards;

    p {
        margin: 0;
        font-size: 1.5rem;
    }
}
.error {
    background-color: var(--color-alert);
    color: var(--color-white);
}

.success {
    background-color: var(--color-approve);
    color: var(--color-white);
}

@keyframes slideIn {
    from {
        top: -10rem;
    }
    to {
        top: 6rem;
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
</style>
