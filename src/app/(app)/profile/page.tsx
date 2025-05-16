import { getLoggedInUser } from '@/repository/users';
import { getUserGifts } from '@/repository/gifts';
import { LoginForm } from '@/modules/user/components/login-form';
import { UserCard } from '@/modules/user/components/user-card';
import { LogoutButton } from '@/modules/user/components/logout-button';

const ProfilePage = async () => {
	const user = await getLoggedInUser();

	if (!user) return <LoginForm />;

	const gifts = await getUserGifts(user.id);

	return (
		<>
			<div className="mb-6 flex items-center justify-between">
				<div className="flex items-center gap-x-4">
					<h1 className="text-3xl">Profile</h1>
				</div>

				<LogoutButton />
			</div>

			<UserCard user={user} giftCount={gifts.length} />
		</>
	);
};

export default ProfilePage;
