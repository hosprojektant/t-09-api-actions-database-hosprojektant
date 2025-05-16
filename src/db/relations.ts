import { relations } from 'drizzle-orm';

import { users } from './users';
import { gifts } from './gifts';

export const usersRelations = relations(users, ({ many }) => ({
	gifts: many(gifts)
}));

export const giftsRelations = relations(gifts, ({ one }) => ({
	user: one(users, {
		fields: [gifts.createdBy],
		references: [users.id]
	})
}));
