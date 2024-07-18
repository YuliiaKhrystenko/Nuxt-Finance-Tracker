<script setup>
const success = ref(false)
const email = ref('')
const pending = ref(false)
const { toastError } = useAppToast()
const supabase = useSupabaseClient()
const redirectUrl = useRuntimeConfig().public.baseUrl + '/confirm';

useRedirectIfAuthenticated()

const handleLogin = async () => {
    pending.value = true

    try {
        const { error } = await supabase.auth.signInWithOtp({
            email: email.value,
            options: {
                emailRedirectTo: redirectUrl
            }
        })

        if (error) {
            toastError({
                title: 'Error authenticating...'
            })
        } else {
            success.value = true
        }
    } finally {
        pending.value = false
    }
}
</script>
