'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { FormInput } from '@/components/form/form-input';
import { SubmitButton } from '@/components/form/submit-button';
import { createGiftAction } from '@/actions/giftActions';

import { type CreateGiftFormSchema, createGiftFormSchema } from './schema';

export const CreateGiftForm = ({ userId }: { userId: number }) => {

	const form = useForm<CreateGiftFormSchema>({
		resolver: zodResolver(createGiftFormSchema),
		defaultValues: {
			userId
		}
	});

	const onSubmit = async (data: CreateGiftFormSchema) => {

		try {
			await createGiftAction(data);
			toast.success(`Gift "${data.name}" created!`);

			form.reset({ name: '', description: '', price: 0, userId });
		} catch (err: unknown) {
			if (err instanceof Error) {
				toast.error(err.message);
			} else {
				toast.error('Something went wrong.');
			}
		}
	};

	return (
		<FormProvider {...form}>
			<form
				onSubmit={e => {
					form.handleSubmit(onSubmit)(e);
				}}
				className="flex w-full flex-col gap-y-2 md:w-1/2 lg:w-1/3"
			>
				<FormInput label="Name" name="name" />
				<FormInput label="Description" name="description" />
				<FormInput label="Price" type="number" name="price" />

				<div className="mt-2">
					<SubmitButton isLoading={false} />
				</div>
			</form>
		</FormProvider>
	);
};
