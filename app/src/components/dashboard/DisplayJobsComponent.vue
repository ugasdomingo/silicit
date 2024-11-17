<script setup lang="ts">
//Import tools
import { useUtilStore } from '@/stores/util-store';
import { jobs } from '@/static/jobs';

//Use tools
const util_store = useUtilStore();
const other_jobs_image = '/images/laptop-bg.jpg';
</script>

<template>
    <section class="jobs__container">
        <article
            class="jobs"
            v-for="job in jobs"
            :key="job.id"
            @click="util_store.open_modal('Job', job)"
        >
            <img :src="job.image_url" alt="job image" class="job_image" />
        </article>
        <article class="jobs" @click="util_store.open_modal('Advisory')">
            <img
                :src="other_jobs_image"
                alt="other job image"
                class="job_image"
            />
        </article>
    </section>
</template>

<style scoped lang="scss">
.jobs__container {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 4rem;

    .jobs {
        width: 100%;
        max-width: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 0;
        border-radius: 1rem;
        box-shadow: 0 0 0.5rem rgba(255, 255, 255, 0.3);
        transition: all 0.5s;
        cursor: pointer;

        .job_image {
            width: 100%;
            border-radius: 1rem;
        }
    }
}
</style>
