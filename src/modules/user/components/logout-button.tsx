'use client';

import { useRouter } from 'next/navigation';

import { logout } from '@/actions/userActions';

export const LogoutButton = () => {
	const router = useRouter();

	const handleClick = async () => {
		await logout();
		router.refresh();
	};

	return (
		<button
			onClick={handleClick}
			className="mt-4 rounded px-3 py-1 text-black transition hover:bg-gray-300"
		>
			Logout
		</button>
	);
};
