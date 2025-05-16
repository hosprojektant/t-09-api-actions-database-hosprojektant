'use client';

import { Check, Loader, X } from 'lucide-react';
import { toast } from 'sonner';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { InferSelectModel } from 'drizzle-orm';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import { toggleDelivered } from '@/actions/giftActions';
import { type gifts } from '@/db/schema';

type Gift = InferSelectModel<typeof gifts>;

export const UpdateDeliveredStatusAction = ({ gift }: { gift: Gift }) => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const Icon = isPending ? Loader : gift.delivered ? X : Check;

	const handleClick = () => {
		startTransition(async () => {
			try {
				await toggleDelivered(gift.id);
				router.refresh();
				toast.success(`Gift ${!gift.delivered ? '' : 'not '}delivered!`);
			} catch (err: unknown) {
				if (err instanceof Error) {
					toast.error(err.message || 'Failed to update gift status.');
				} else {
					toast.error('Failed to update gift status.');
				}
			}
		});
	};

	return (
		<Button onClick={handleClick} disabled={isPending}>
			<Icon size={16} className={cn(isPending && 'animate-spin')} />
		</Button>
	);
};
