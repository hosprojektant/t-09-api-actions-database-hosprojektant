'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { FormInput } from '@/components/form/form-input';
import { SubmitButton } from '@/components/form/submit-button';
import { login } from '@/actions/userActions';

import { loginFormSchema, type LoginFormSchema } from './schema';

export const LoginForm = () => {
	const router = useRouter();

	const form = useForm<LoginFormSchema>({
		resolver: zodResolver(loginFormSchema)
	});

	const onSubmit = async (values: LoginFormSchema) => {
		try {
			const user = await login(values.username, values.password);

			if (!user) {
				toast.error('Invalid credentials');
				return;
			}

			toast.success(`Logged in as ${user.name}`);
			router.refresh();
		} catch (err: unknown) {
			if (err instanceof Error) {
				toast.error(err.message || 'Login failed');
			} else {
				toast.error('Login failed');
			}
		}
	};

	return (
		<FormProvider {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex w-full flex-col gap-y-2 md:w-1/2 lg:w-1/3"
			>
				<FormInput label="Username" name="username" />
				<FormInput label="Password" type="password" name="password" />

				<div className="mt-2">
					<SubmitButton isLoading={false} />
				</div>
			</form>
		</FormProvider>
	);
};
