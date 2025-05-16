import { eq } from 'drizzle-orm';

import { users } from '@/db/users';
import { db } from '@/index';

export const findUserByUsername = async (username: string) =>
	db.query.users.findFirst({
		where: eq(users.username, username)
	});

export const loginUser = async (id: number) => {
	await db
		.update(users)
		.set({ isLoggedIn: true })
		.where(eq(users.id, id))
		.run();
};

export const logoutAllUsers = async () => {
	await db.update(users).set({ isLoggedIn: false }).run();
};

export const getLoggedInUser = async () => {
	const user = await db.query.users.findFirst({
		where: eq(users.isLoggedIn, true)
	});

	return user ?? null;
};
