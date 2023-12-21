import { useTodos } from '@/composables/useTodos'

import { describe, expect, test, vi } from 'vitest';

import { mockNuxtImport, registerEndpoint } from '@nuxt/test-utils/runtime'

import { ref } from 'vue'

describe('test useTodos', () => {

  //let fakeUserId = 'da877065-a8c6-4015-87f7-f4f2dc98e665'
  // let mockUser = ref({ id: fakeUserId, name: 'John Doe', email: 'jdoe@gmail.com' })

  const fakeTodos = [
    {
      "id": 26,
      "user_id": 'fakeUserId',
      "title": "do task 6",
      "completed": false,
      "created_at": "2023-11-02T07:53:16.122271"
    },
    {
      "id": 25,
      "user_id": 'fakeUserId',
      "title": "do task 5",
      "completed": false,
      "created_at": "2023-11-02T07:40:40.831005"
    },
    {
      "id": 24,
      "user_id": 'fakeUserId',
      "title": "do task 4",
      "completed": false,
      "created_at": "2023-11-02T07:34:53.072185"
    },
    {
      "id": 23,
      "user_id": 'fakeUserId',
      "title": "do task 3",
      "completed": true,
      "created_at": "2023-11-02T07:34:45.222061"
    }
  ]

  /*  mockNuxtImport('useSupabaseUser', () => {
     return ref({ id: 'fakeUserId', name: 'John Doe', email: 'jdoe@gmail.com' })
   }) */

  registerEndpoint("/api/todos", {
    method: "GET",
    handler: () => (fakeTodos)
  })

  test('get List of todos', async () => {
    const { todos, getTodos } = useTodos();

    await getTodos();

    expect(todos.value.length).toBeGreaterThan(0);
  })
})