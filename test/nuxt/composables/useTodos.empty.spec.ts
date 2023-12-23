import { useTodos } from '@/composables/useTodos'
import { describe, expect, test, vi, beforeAll, expectTypeOf } from 'vitest';
import { mockNuxtImport, registerEndpoint } from '@nuxt/test-utils/runtime'

import { randomUUID } from 'crypto'

describe('test useTodos', () => {
  mockNuxtImport('useSupabaseUser', () => {
    return () => {
      return { value: 'mocked storage' }
    }
  })

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
      "completed": true,
      "created_at": "2023-11-02T07:34:45.222061"
    }
  ]

  let fakeTodosWithNewTodo = Array.from(fakeTodos)
  fakeTodosWithNewTodo.push({
    "id": randomUUID(),
    "user_id": fakeUserId,
    "title": "do task 5",
    "completed": true,
    "created_at": "2023-11-02T07:34:45.222061"
  })

  test('create a todo is not working', async () => {
    registerEndpoint("/api/todos", {
      method: "POST",
      handler: () => (null)
    })

    const { todos, addTodo, state, toast } = useTodos();

    expect(todos.value.length).toBe(0);

    state.title = 'test2' as any

    await addTodo({
      data: {
        title: 'test'
      }
    } as any);

    expect(todos.value.length).toBe(0);
  })
})