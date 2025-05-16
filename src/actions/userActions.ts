'use server';

import {
	findUserByUsername,
	loginUser,
	logoutAllUsers
} from '@/repository/users';

export const login = async (username: string, password: string) => {
	const user = await findUserByUsername(username);

	if (!user || user.password !== password) {
		return null;
	}

	await logoutAllUsers();
	await loginUser(user.id);

	return user;
};

export const logout = async () => {
	await logoutAllUsers();
};
