import { integer, text, sqliteTable } from 'drizzle-orm/sqlite-core';

import { users } from './users';

export const gifts = sqliteTable('gifts', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	description: text('description'),
	price: integer('price').notNull(),
	createdBy: integer('created_by')
		.notNull()
		.references(() => users.id),
	delivered: integer('delivered', { mode: 'boolean' }).notNull().default(false)
});
