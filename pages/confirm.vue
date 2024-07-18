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


import { useRoute } from 'vue-router';
import { useSupabaseClient } from '@supabase/supabase-js';

const route = useRoute();
const supabase = useSupabaseClient();

const confirmSignUp = async () => {
    const { access_token } = route.query;
    if (access_token) {
        const { error } = await supabase.auth.signIn({
            access_token
        });

        if (error) {
            // Handle error (e.g., show a message to the user)
            console.error("Error confirming sign-up:", error);
        } else {
            // Redirect to a success page or dashboard
            window.location.href = '/dashboard';
        }
    } else {
        // Handle missing access token
        console.error("No access token provided in URL");
    }
};

confirmSignUp();
</script>