import { useTodos } from '@/composables/useTodos'

import { describe, expect, test, beforeEach, beforeAll, afterAll, afterEach, vi } from 'vitest';

import { setup, mockNuxtImport } from 'nuxt-vitest'

import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

let mockUser = {}

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

/* mockNuxtImport('useSupabaseClient', () => {
  return () => mockClient
}) */

mockNuxtImport('useSupabaseUser', () => {
  return () => mockUser
})

describe('test useTodos', () => {
  console.log('test useTodos');

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

        return HttpResponse.json(['Tom', 'Jerry', 'Spike'])
      }
    )
  )

  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  test('get List of todos', async () => {
    mockUser = { id: 'da877065-a8c6-4015-87f7-f4f2dc98e665', name: 'John Doe', email: 'jdoe@gmail.com' }
    const { todos, getTodos } = useTodos();

    await getTodos();

    console.log('todos: ', todos.value);

    expect(todos.value.length).toBeGreaterThan(0);
  })
})