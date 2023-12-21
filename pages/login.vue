<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const { baseUrl } = useRuntimeConfig().public

console.log(baseUrl, 'baseUrl')

let redirectTo = `${baseUrl}/confirm`;

const login = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: { redirectTo },
    })

    if (error) console.error(error)
}

watchEffect(() => {
    if (user.value) {
        navigateTo('/')
    }
})
</script>

<template>
    <div class="pt-16">
        <UContainer>
            <UCard>
                <div>
                    <h1>Todo List</h1>
                    <UButton @click="login" class="my-4" icon="i-mdi-github" dynamic>Login with Github</UButton>
                </div>
            </UCard>
        </UContainer>
    </div>
</template>