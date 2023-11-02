import { boolean, pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const todos = pgTable('todos', {
    id: serial('id').primaryKey(),
    userId: uuid('user_id').notNull(), // GitHub Id
    title: text('title').notNull(),
    completed: boolean('completed').default(false).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
})