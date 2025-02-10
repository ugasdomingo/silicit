<script setup lang="ts">
//Import components
import LeftContentComponent from '@/components/dashboard/LeftContentComponent.vue';
import RightContentComponent from '@/components/dashboard/RightContentComponent.vue';
</script>

<template>
    <main class="pages">
        <img
            src="https://res.cloudinary.com/minteados/image/upload/v1732091632/silicit/backgrounds/fondo-silicit_xf3loh.png"
            alt="image background"
            class="background"
        />
        <LeftContentComponent />
        <RightContentComponent />
    </main>
</template>

<style scoped lang="scss">
.pages {
    flex-direction: row;
    justify-content: space-between;

    .background {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        object-fit: cover;
        opacity: 0.8;
        z-index: -1;
    }
}

@media screen and (max-width: 768px) {
    .pages {
        flex-direction: column;
    }
}
</style>
