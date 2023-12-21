import { useTodos } from '@/composables/useTodos'

import { describe, expect, test, beforeEach, beforeAll, afterAll, afterEach, vi } from 'vitest';

import { mockNuxtImport } from '@nuxt/test-utils/runtime'

import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import { ref } from 'vue'

let mockUser = ref({})
const fakeUserId = 'da877065-a8c6-4015-87f7-f4f2dc98e665'

const mockClient = {
  auth: {
    signOut: vi.fn(),

  },
  from: vi.fn(() => ({
    insert: vi.fn(() => ({
      select: vi.fn(() => ({
        single: vi.fn(() => ({
          data: { id: 1, title: 'test' }
        }))
      }))
    }))
  }))
}

/* mockNuxtImport('useSupabaseClient', (  => {
  retur  () => mockClient
}) */

mockNuxtImport('useSupabaseUser', () => {
  return () => mockUser
})

describe('test useTodos', () => {
  console.log('test useTodosg');

  const server = setupServer(
    http.get(
      // The "/todos" string is a path predicate.
      // Only the GET requests whose path matches
      // the "/todos" string will be intercepted.
      'http://localhost:54321/rest/v1/todos',
      // The function below is a "resolver" function.
      // It accepts a bunch of information about the
      // intercepted request, and decides how to handle it.
      ({ request, params, cookies }) => {

        console.log('request :', request.url);
        console.log('params :', params);

        return HttpResponse.json([
          {
            "id": 26,
            "user_id": fakeUserId,
            "title": "do task 6",
            "completed": false,
            "created_at": "2023-11-02T07:53:16.122271"
          },
          {
            "id": 25,
            "user_id": fakeUserId,
            "title": "do task 5",
            "completed": false,
            "created_at": "2023-11-02T07:40:40.831005"
          },
          {
            "id": 24,
            "user_id": fakeUserId,
            "title": "do task 4",
            "completed": false,
            "created_at": "2023-11-02T07:34:53.072185"
          },
          {
            "id": 23,
            "user_id": fakeUserId,
            "title": "do task 3",
            "completed": true,
            "created_at": "2023-11-02T07:34:45.222061"
          }
        ])
      }
    )
  )

  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  test('get List of todos', async () => {
    mockUser.value = { id: fakeUserId, name: 'John Doe', email: 'jdoe@gmail.com' }
    const { todos, getTodos } = useTodos();

    // fetch('http://localhost:54321/rest/v1/todos') is intercepted by msw

    await getTodos(); // is not intercepted by msw

    console.log('todos :', todos.value);

    expect(todos.value.length).toBeGreaterThan(0);
  })
})