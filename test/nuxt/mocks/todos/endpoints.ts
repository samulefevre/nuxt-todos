import { registerEndpoint } from '@nuxt/test-utils/runtime'
import { randomUUID } from 'crypto'

import { readBody } from 'h3'

export const fakeUserId = randomUUID()

export const fakeTodos = [
    {
        "id": randomUUID(),
        "user_id": fakeUserId,
        "title": "do task 1",
        "completed": false,
        "created_at": new Date()
    },
    {
        "id": randomUUID(),
        "user_id": fakeUserId,
        "title": "do task 2",
        "completed": false,
        "created_at": new Date()
    },
    {
        "id": randomUUID(),
        "user_id": fakeUserId,
        "title": "do task 3",
        "completed": false,
        "created_at": new Date()
    },
    {
        "id": randomUUID(),
        "user_id": fakeUserId,
        "title": "do task 4",
        "completed": false,
        "created_at": new Date()
    }
]

registerEndpoint("/api/todos", {
    method: "GET",
    handler: () => (fakeTodos)
})

registerEndpoint("/api/todos", {
    method: "POST",
    handler: async (req) => {
        const { title } = await readBody(req)

        return {
            "id": randomUUID(),
            "user_id": fakeUserId,
            "title": title,
            "completed": false,
            "created_at": new Date()
        }
    }
})

registerEndpoint(`/api/todos/${fakeTodos[3].id}`, {
    method: "DELETE",
    handler: () => (fakeTodos[3])
})

registerEndpoint(`/api/todos/${fakeTodos[3].id}`, {
    method: "PATCH",
    handler: async (req) => {
        const { completed } = await readBody(req)
        return {
            ...fakeTodos[3],
            completed: completed
        }
    }
})
