<script setup lang="ts">
const supabase = useSupabaseClient()

const { baseUrl } = useRuntimeConfig().public

let redirectTo = `${baseUrl}/confirm`;

const login = async () => {
    console.log('LOGIN')
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: { redirectTo },
    })

    if (error) console.log(error)
}
</script>

<template>
    <div class="pt-16">
        <UContainer>
            <UCard>
                <div>
                    <h1>Todo List</h1>
                    <UButton @click="login" class="my-4" icon="i-simple-icons-github">Login with Github</UButton>
                </div>
            </UCard>
        </UContainer>
    </div>
</template>