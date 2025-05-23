import { z } from 'zod';

export const createGiftFormSchema = z
	.object({
		name: z.string().min(3),
		description: z.string().max(25).optional(),
		price: z.coerce.number().nonnegative(),
		userId: z.coerce.number()
	})
	.refine(
		data => {
			const max = data.description ? data.description.length : data.name.length;
			return data.price <= max;
		},
		{
			message:
				'Price must be less than or equal to the length of the name or description',
			path: ['price']
		}
	);

export type CreateGiftFormSchema = z.infer<typeof createGiftFormSchema>;
