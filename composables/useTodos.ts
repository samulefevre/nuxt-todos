import { z } from 'zod'
import type { FormSubmitEvent, FormError } from '#ui/types'
import type { Tables } from '~/types/supabase'

export const useTodos = () => {
    // const newTitleInput = ref<any>(null)

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

    const addTodo = async (event: FormSubmitEvent<Schema>) => {
        if (!state.title) return

        const { data: todo, error } = await useFetch<Tables<'todos'>>('/api/todos', {
            method: 'POST',
            body: {
                title: state.title
            }
        })

        console.log('todo.value', todo.value)
        console.log('error.value', error.value)

        if (error.value) {
            console.log("can't add todo")
            toast.add({ title: "can't add todo", color: 'red' })
        }

        if (!todo.value) return

        todos.value = [todo.value, ...todos.value]
        toast.add({ title: `Todo "${todo.value.title}" created.` })
        state.title = undefined
        /* nextTick(() => {
            newTitleInput.value?.input?.focus()
        }) */


    }

    const getTodos = async () => {
        const { data, error } = await useFetch<Tables<'todos'>[]>(`/api/todos`)

        if (error.value) {
            toast.add({ title: "can't get todos", color: 'red' })
            return
        }

        if (data.value) {
            todos.value = data.value
        }
    }

    const toggleTodo = async (todo: Tables<'todos'>) => {
        todo.completed = !todo.completed

        const { error } = await useFetch<Tables<'todos'>>(`/api/todos/${todo.id}`, {
            method: 'PATCH',
            body: {
                completed: todo.completed
            }
        })

        if (error.value) {
            todo.completed = !todo.completed
            toast.add({ title: "can't update todo", color: 'red' })
            return
        }

    }

    const deleteTodo = async (todo: Tables<'todos'>) => {
        const { data, error } = await useFetch(`/api/todos/${todo.id}`, {
            method: 'DELETE'
        })

        if (error.value) {
            toast.add({ title: "can't delete todo", color: 'red' })
            return
        }

        if (data.value) {
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
        deleteTodo,
        toast
    }

}