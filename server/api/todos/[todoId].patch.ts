import { serverSupabaseClient } from '#supabase/server'
import { serverSupabaseUser } from '#supabase/server'
import type { DB } from '~/types/supabase'

import { z } from 'zod'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient<DB>(event)
    const user = await serverSupabaseUser(event)

    if (!user) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        })
    }

    const { todoId } = await getValidatedRouterParams(event, z.object({
        todoId: z.string().length(36)
    }).parse)

    const { completed } = await readValidatedBody(event, z.object({
        completed: z.boolean()
    }).parse)

    const { data: todo, error } = await client.from('todos').update({
        completed: completed
    }).eq('user_id', user.id).eq('id', todoId).select()

    if (error) {
        throw createError({
            statusCode: 500,
            message: "can't update todo"
        })
    }

    return todo
})