import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { randomUUID } from 'crypto'

export const todos = pgTable('todos', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull(), // GitHub Id
    title: text('title').notNull(),
    completed: boolean('completed').default(false).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
})