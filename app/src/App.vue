<script setup lang="ts">
//Import tools
import { RouterView } from 'vue-router';
import { useUtilStore } from '@/stores/util-store';

//Import components
import HeaderComponent from './components/layout/HeaderComponent.vue';
import FooterComponent from './components/layout/FooterComponent.vue';
import DisplayMessageComponent from './components/common/DisplayMessageComponent.vue';
import ModalComponent from './components/common/ModalComponent.vue';
import FloatingPromoComponent from './components/layout/FloatingPromoComponent.vue';
55;

//Activate tools
const utilStore = useUtilStore();
</script>

<template>
    <HeaderComponent />
    <DisplayMessageComponent
        v-if="utilStore.show_notification"
        :message="utilStore.message"
        :type="utilStore.message_type"
    />
    <ModalComponent
        v-if="utilStore.show_modal"
        :type="utilStore.modal_type"
        :data="utilStore.modal_data"
    />
    <RouterView />
    <FloatingPromoComponent />
    <FooterComponent />
</template>

<style scoped lang="scss"></style>
