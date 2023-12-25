import { useTodos } from '@/composables/useTodos'
import { describe, expect, it } from 'vitest';

import { fakeTodos, fakeUserId } from '~/test/nuxt/mocks/todos/endpoints'

describe('test useTodos when success', () => {
  it('should return the correct number of todo items', async () => {
    const { todos, getTodos } = useTodos();

    await getTodos();

    expect(todos.value.length).toBe(4);
  })

  it('create a todo with the title', async () => {
    const { todos, addTodo, state } = useTodos();
    state.title = 'task' as any

    await addTodo({
      data: {
        title: 'task'
      }
    } as any);

    expect(todos.value.length).toBe(1);
    expect(todos.value[0].title).toBe('task');
  })

  it(`don't create a todo when no title submitted`, async () => {
    const { todos, addTodo } = useTodos();

    await addTodo({
      data: {
        title: undefined
      }
    } as any);

    expect(todos.value.length).toBe(0);
  })

  it('delete the todo', async () => {
    const { todos, deleteTodo } = useTodos();

    todos.value = fakeTodos as any

    expect(todos.value.length).toBe(4);

    await deleteTodo(fakeTodos[3] as any);

    expect(todos.value.length).toBe(3);
  })

  it('toggles the completed value of todo', async () => {
    const { todos, toggleTodo } = useTodos();

    todos.value = fakeTodos as any

    expect(todos.value.length).toBe(4);
    expect(todos.value[3].completed).toBe(false);

    await toggleTodo(fakeTodos[3] as any);

    expect(todos.value.length).toBe(4);
    expect(todos.value[3].completed).toBe(true);
  })
})
