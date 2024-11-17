<script setup lang="ts">
//Import tools
import { useUtilStore } from '@/stores/util-store';

//Import components
import CalendlyComponent from './CalendlyComponent.vue';
import JobModalComponent from './modal/JobModalComponent.vue';

//Use tools
const utilStore = useUtilStore();
const props = defineProps<{
    type: string;
    data: any;
}>();
</script>

<template>
    <section class="modal">
        <div class="modal__close" @click="utilStore.close_modal">X</div>

        <JobModalComponent v-if="props.type === 'Job'" :data="props.data" />

        <div class="modal__assesor" v-if="props.type === 'Advisory'">
            <CalendlyComponent />
        </div>
    </section>
</template>

<style scoped lang="scss">
.modal {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    color: var(--color-text);
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(0.75rem);
    box-sizing: border-box;
    z-index: 1000;

    .modal__close {
        position: absolute;
        top: 2rem;
        right: 4rem;
        font-size: 2rem;
        cursor: pointer;
    }
}
</style>
