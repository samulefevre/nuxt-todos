import { z } from 'zod'
import type { FormSubmitEvent, FormError } from '#ui/types'
import type { DB, Tables } from '~/types/supabase'

export const useTodos = () => {
    const newTitleInput = ref<any>(null)
    const client = useSupabaseClient<DB>()
    const user = useSupabaseUser()

    const todos = ref<Tables<'todos'>[]>([])

    const schema = z.object({
        title: z.string().min(2, 'Must be at least 2 characters')
    })

    type Schema = z.output<typeof schema>

    const state = reactive({
        title: undefined,
    })

    const form = ref<{ errors: FormError[] }>({ errors: [] })

    const loading = ref(false)

    const toast = useToast()

    async function addTodo(event: FormSubmitEvent<Schema>) {
        // Do something with data
        console.log(event.data)

        if (!user.value || !state.title) return

        const { data: todo, error } = await client.from('todos').insert([
            {
                title: state.title,
                user_id: user.value.id
            }
        ]).select().single()

        if (error) {
            toast.add({ title: "can't add todo", color: 'red' })
            return
        }

        if (todo) {
            todos.value.push(todo)
            toast.add({ title: `Todo "${todo.title}" created.` })
            state.title = undefined
            nextTick(() => {
                newTitleInput.value?.input?.focus()
            })
        }

    }

    const getTodos = async () => {
        const { data, error } = await client.from('todos').select().order('created_at', { ascending: false })

        if (error) {
            toast.add({ title: "can't get todos", color: 'red' })
            return
        }

        todos.value = data
    }

    const toggleTodo = async (todo: Tables<'todos'>) => {
        todo.completed = !todo.completed

        await client.from('todos').update({
            completed: todo.completed
        }).eq('id', todo.id)
    }

    const deleteTodo = async (todo: Tables<'todos'>) => {
        const { data, error } = await client.from('todos').delete().eq('id', todo.id).select()

        if (error) {
            toast.add({ title: "can't delete todo", color: 'red' })
            return
        }

        if (data) {
            todos.value = todos.value.filter(t => t.id !== todo.id)
            toast.add({ title: `Todo "${todo.title}" deleted.` })
        }
    }

    return {
        schema,
        state,
        addTodo,
        getTodos,
        todos,
        toggleTodo,
        loading,
        form,
        deleteTodo
    }

}