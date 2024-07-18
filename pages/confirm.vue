<template>
    <UCard>
        <template #header>
            <h1 class="text-xl text-center">Confirming your account...</h1>
        </template>
        <p>Wait a moment while we log you in...</p>
    </UCard>
</template>

<script setup>
useRedirectIfAuthenticated()
</script>