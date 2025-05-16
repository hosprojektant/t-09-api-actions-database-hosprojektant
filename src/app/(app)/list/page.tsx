import { getAllGiftsAction } from '@/actions/giftActions';
import { getLoggedInUser } from '@/repository/users';
import { GiftList } from '@/modules/gift/components/gift-list';

const GiftListPage = async () => {
	const user = await getLoggedInUser();
	const gifts = await getAllGiftsAction();

	return (
		<>
			<h1 className="mb-6 text-3xl">Gift list</h1>
			<GiftList gifts={gifts} user={user} />
		</>
	);
};

export default GiftListPage;
