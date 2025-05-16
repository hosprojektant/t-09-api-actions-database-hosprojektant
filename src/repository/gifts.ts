import { eq } from 'drizzle-orm';

import { gifts } from '@/db/gifts';

import { db } from '../index';

export const createGift = async (gift: {
	name: string;
	description?: string;
	price: number;
	createdBy: number;
}) => {
	await db.insert(gifts).values(gift).run();
};

export const toggleGiftDelivery = async (giftId: number) => {
	const gift = await db.query.gifts.findFirst({
		where: eq(gifts.id, giftId)
	});

	if (!gift) throw new Error('Gift not found');

	await db
		.update(gifts)
		.set({ delivered: !gift.delivered })
		.where(eq(gifts.id, giftId))
		.run();
};
export const getGifts = async () => db.select().from(gifts).all();

export const getUserGifts = async (userId: number) =>
	db.select().from(gifts).where(eq(gifts.createdBy, userId)).all();

export const getAllGiftsWithUsers = async () =>
	db.query.gifts.findMany({
		with: {
			user: true
		}
	});
