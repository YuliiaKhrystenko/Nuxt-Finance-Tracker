<template>
    <div class="container mx-auto max-w-4xl">
        <AppHeader />
        <main>
            <slot />
        </main>
    </div>
</template>

<script setup>
useHead({
    link: [
        {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com'
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Montserrat&display=swap',
            crossorigin: ''
        }
    ]
})
</script>

<style>
body {
    font-family: "Montserrat", sans-serif;
}

body {
    @apply bg-white dark:bg-gray-900 text-gray-800 dark:text-white
}
</style>