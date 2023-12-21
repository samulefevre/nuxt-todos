import { useTodos } from '@/composables/useTodos'
import { describe, expect, test, vi, beforeAll } from 'vitest';
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

  registerEndpoint("/api/todos", {
    method: "GET",
    handler: () => (fakeTodos)
  })

  /* registerEndpoint("/api/todos", {
    method: "POST",
    handler: () => (fakeTodosWithNewTodo)
  }) */

  registerEndpoint(`/api/todos/${fakeTodos[3].id}`, {
    method: "DELETE",
    handler: () => (fakeTodos[3])
  })

  registerEndpoint(`/api/todos/${fakeTodos[3].id}`, {
    method: "PATCH",
    handler: () => (fakeTodos[3])
  })

  test('get List of todos', async () => {
    const { todos, getTodos } = useTodos();

    await getTodos();

    expect(todos.value.length).toBe(4);
  })

  test('create a todo is working when title defined', async () => {
    registerEndpoint("/api/todos", {
      method: "POST",
      handler: () => (fakeTodosWithNewTodo)
    })

    const { todos, addTodo, state } = useTodos();
    state.title = 'task' as any

    await addTodo({
      data: {
        title: 'task'
      }
    } as any);

    expect(todos.value.length).toBe(1);
  })

  test('create a todo is not working when title is undefined', async () => {
    registerEndpoint("/api/todos", {
      method: "POST",
      handler: () => (fakeTodosWithNewTodo)
    })

    const { todos, addTodo } = useTodos();

    await addTodo({
      data: {
        title: undefined
      }
    } as any);

    expect(todos.value.length).toBe(0);
  })

  test('delete a todo is working', async () => {
    const { todos, deleteTodo } = useTodos();

    todos.value = fakeTodos

    expect(todos.value.length).toBe(4);

    await deleteTodo(fakeTodos[3]);

    expect(todos.value.length).toBe(3);
  })

  test('toggle a todo is working', async () => {
    const { todos, toggleTodo } = useTodos();

    todos.value = fakeTodos

    expect(todos.value.length).toBe(4);
    expect(todos.value[3].completed).toBe(true);

    await toggleTodo(fakeTodos[3]);

    expect(todos.value.length).toBe(4);
    expect(todos.value[3].completed).toBe(false);
  })
})