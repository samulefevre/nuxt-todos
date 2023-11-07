<script setup lang="ts">
const { state, schema, addTodo, getTodos, todos, toggleTodo, loading, form, deleteTodo } = useTodos()

await getTodos()

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const logout = async () => {
    console.log('LOGOUT')
    await supabase.auth.signOut()
    await navigateTo('/login')
}

const items = [[{
    label: 'Logout',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    click: logout
}]]


</script>

<template>
    <UCard>
        <template #header>
            <h3 class="text-lg font-semibold leading-6">
                <NuxtLink to="/">
                    Todo List
                </NuxtLink>
            </h3>

            <UDropdown v-if="user" :items="items">
                <UButton color="white" trailing-icon="i-heroicons-chevron-down-20-solid">
                    <UAvatar :src="`https://github.com/${user.user_metadata.user_name}.png`"
                        :alt="user.user_metadata.user_name" size="3xs" />
                    {{ user.user_metadata.user_name }}
                </UButton>
            </UDropdown>
        </template>
        <div>
            <UForm ref="form" :schema="schema" :state="state" @submit="addTodo">
                <div class="flex flex-row gap-2">
                    <UFormGroup label="Title" name="title" class="w-full">

                        <UInput v-model="state.title" ref="newTitleInput" placeholder="Make a Nuxt demo" autocomplete="off"
                            autofocus class="w-full block" :disabled="loading" />


                    </UFormGroup>
                    <div class="flex-none items-center h-8 mt-6">
                        <UButton type="submit" icon="i-heroicons-plus-20-solid" :loading="loading"
                            :disabled="state.title === undefined || form.errors.length > 0" />
                    </div>
                </div>


            </UForm>
            <ul class="divide-y divide-gray-200 dark:divide-gray-800 mt-8">
                <li v-if="todos.length > 0" v-for="todo in todos" @key="todo.id"
                    class="flex flex-col divide-y divide-gray-200">
                    <div class="flex items-center justify-between gap-4 py-2">
                        <div class="font-medium" :class="[todo.completed ? 'line-through text-gray-500' : '']">{{ todo.title
                        }}</div>
                        <div class="flex flex-row gap-4 justify-center items-center">
                            <UToggle color="primary" :model-value="Boolean(todo.completed)"
                                @update:model-value="toggleTodo(todo)" />


                            <UButton :padded="false" color="red" variant="link" icon="i-heroicons-x-mark-20-solid"
                                @click="deleteTodo(todo)" />
                        </div>
                    </div>
                </li>
                <p v-else>No todos found</p>
            </ul>
        </div>
    </UCard>
</template>