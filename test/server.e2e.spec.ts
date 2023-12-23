import { describe, expect, test, vi, beforeAll } from 'vitest';
import { registerEndpoint } from '@nuxt/test-utils/runtime'
// import { registerEndpoint } from '@nuxt/test-utils/runtime'

import { randomUUID } from 'crypto'

import { fileURLToPath } from 'node:url'

console.log(import.meta.url)

/* await setup({
    rootDir: fileURLToPath(new URL('', import.meta.url)),
}) */

const fakeUserId = randomUUID()

const fakeTodos = [
    {
        "id": randomUUID(),
        "user_id": fakeUserId,
        "title": "do task 1",
        "completed": false,
        "created_at": "2023-11-02T07:53:16.122271"
    },
    {
        "id": randomUUID(),
        "user_id": fakeUserId,
        "title": "do task 2",
        "completed": false,
        "created_at": "2023-11-02T07:40:40.831005"
    },
    {
        "id": randomUUID(),
        "user_id": fakeUserId,
        "title": "do task 3",
        "completed": false,
        "created_at": "2023-11-02T07:34:53.072185"
    },
    {
        "id": randomUUID(),
        "user_id": fakeUserId,
        "title": "do task 4",
        "completed": false,
        "created_at": "2023-11-02T07:34:45.222061"
    }
]

describe('test API', async () => {

    /* await setup({
        server: true
    })


    registerEndpoint("/api/todos", {
        method: "GET",
        handler: () => (fakeTodos)
    }) */


    test('return list of todos when fetching api/todos', async () => {
        registerEndpoint("/api/todos", {
            method: "GET",
            handler: () => (fakeTodos)
        })

        const res = await $fetch('/api/todos')
        // const { body } = res

        // console.log('todosFetch', res)

        //expect(res).toMatchObject(fakeTodos)
        expect(res).toMatchObject(fakeTodos)
    })

    test('dummy test', () => {
        expect(true).toBe(true)
    })


})

