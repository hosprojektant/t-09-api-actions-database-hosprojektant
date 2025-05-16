'use server';

import { z } from 'zod';

import {
	createGift,
	toggleGiftDelivery,
	getAllGiftsWithUsers
} from '@/repository/gifts';

export const toggleDelivered = async (giftId: number) => {
	await toggleGiftDelivery(giftId);
};

const giftSchema = z
	.object({
		name: z.string().min(3),
		description: z.string().max(25).optional(),
		price: z.number().nonnegative(),
		userId: z.number()
	})
	.refine(
		data => {
			const refLength = data.description?.length ?? data.name.length;
			return data.price <= refLength;
		},
		{
			message:
				'Price must be less than or equal to description length or name length.',
			path: ['price']
		}
	);

export const createGiftAction = async (data: unknown) => {
	const parsed = giftSchema.safeParse(data);
	if (!parsed.success) throw new Error('Invalid form data');

	const { userId, ...rest } = parsed.data;

	await createGift({
		...rest,
		createdBy: userId
	});
};

export const getAllGiftsAction = async () => getAllGiftsWithUsers();
