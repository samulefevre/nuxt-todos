import { serverSupabaseClient } from '#supabase/server'
import { serverSupabaseUser } from '#supabase/server'
import type { DB } from '~/types/supabase'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient<DB>(event)
    const user = await serverSupabaseUser(event)

    const { title } = await readBody(event)

    if (!user) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        })
    }

    const { data: todo, error } = await client.from('todos').insert([
        {
            title,
            user_id: user.id
        }
    ]).select().single()

    if (error) {
        throw createError({
            statusCode: 500,
            message: "can't add todo"
        })
    }

    return todo
})