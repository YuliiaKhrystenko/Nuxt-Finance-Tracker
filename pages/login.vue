<template>
    <UCard v-if="!success">
        <template #header>
            <h1 class="text-xl text-center">Welcome to the Finance Tracker!</h1>
        </template>
        <form @submit.prevent="handleLogin">
            <UFormGroup label="Email" name="email" class="mb-4" :required="true"
                help="You'll receive an email with confirmation link">
                <UInput type="email" placeholder="you@example.com" v-model="email" required />
            </UFormGroup>
            <div class="flex justify-center">
                <UButton type="submit" variant="solid" color="black" size="md" class="align-center" :loading="pending"
                    :disabled="pending">
                    Continue
                </UButton>
            </div>

        </form>
    </UCard>
    <UCard v-else>
        <template #header>
            <h1 class="text-xl text-center">Email has been sent!</h1>
        </template>
        <div class="text-center">
            <p class="mb-4">We have sent an email to <strong>{{ email }}</strong> with a link to confirm your
                account.
            </p>
            <p>The link will expire in 5 minutes.</p>
        </div>
    </UCard>
</template>

<script setup>
const success = ref(false)
const email = ref('')
const pending = ref(false)
const { toastError } = useAppToast()
const supabase = useSupabaseClient()

useRedirectIfAuthenticated()

const handleLogin = async () => {
    pending.value = true

    try {
        const { error } = await supabase.auth.signInWithOtp({
            email: email.value,
            options: {
                emailRedirectTo: 'http://localhost:3000/confirm'
            }
        })

        if (error) {
            toastError({
                title: 'Error authenticating'
            })
        } else {
            success.value = true
        }
    } finally {
        pending.value = false
    }
}
</script>