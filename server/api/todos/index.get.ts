import { serverSupabaseClient } from '#supabase/server'
import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const user = await serverSupabaseUser(event)

    if (!user) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        })
    }

    const { data, error } = await client.from('todos').select().eq('user_id', user.id).order('created_at', { ascending: false })

    if (error) {
        throw createError({
            statusCode: 500,
            message: "can't get todos"
        })
    }

    return data
})