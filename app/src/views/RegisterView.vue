<script setup lang="ts">
//Import tools
import { useRouter } from 'vue-router';

//Import components
import RegisterComponent from '@/components/auth/RegisterComponent.vue';

//Variables
const router = useRouter();
const plan = router.currentRoute.value.params.plan as string;
</script>

<template>
    <main class="pages">
        <RegisterComponent :membershipType="plan" />
    </main>
</template>

<style scoped lang="scss"></style>
