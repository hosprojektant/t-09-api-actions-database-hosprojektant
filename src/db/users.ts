import { integer, text, sqliteTable } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	username: text('username').notNull(),
	password: text('password').notNull(),
	role: text('role', { enum: ['santa', 'user'] }).notNull(),
	isLoggedIn: integer('is_logged_in', { mode: 'boolean' })
		.notNull()
		.default(false)
});
