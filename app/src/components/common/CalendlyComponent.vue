<template>
    <div
        class="calendly-inline-widget"
        data-url="https://calendly.com/ugasdomingo99/30min"
        style="min-width: 320px; height: 700px"
    ></div>
</template>

<script lang="ts">
export default {
    mounted() {
        const recaptchaScript = document.createElement('script');
        recaptchaScript.setAttribute(
            'src',
            'https://assets.calendly.com/assets/external/widget.js'
        );
        document.head.appendChild(recaptchaScript);
    }
};
</script>
