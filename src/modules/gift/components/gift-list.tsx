'use client';

import type { InferSelectModel } from 'drizzle-orm';

import { LabeledItem } from '@/components/labeled-item';
import { type gifts, type users } from '@/db/schema';

import { UpdateDeliveredStatusAction } from './update-delivered-status-action';

type Gift = InferSelectModel<typeof gifts> & {
	user: InferSelectModel<typeof users>;
};

type User = InferSelectModel<typeof users>;

const GiftListItem = ({
	gift,
	currentUser
}: {
	gift: Gift;
	currentUser: User | null;
}) => {
	const delivered = gift.delivered ? 'Yes' : 'No';

	return (
		<li className="relative grid gap-4 rounded-md bg-white px-8 py-4 md:grid-cols-3">
			{currentUser?.id === gift.createdBy && (
				<span className="badge absolute top-4 right-4">
					{currentUser.name}&#39;s gift
				</span>
			)}

			<LabeledItem label="Name">{gift.name}</LabeledItem>
			<LabeledItem label="Description" className="col-span-2">
				{gift.description ?? <em className="text-gray-500">No description</em>}
			</LabeledItem>

			<LabeledItem label="Price">{gift.price}</LabeledItem>
			<LabeledItem label="Created By">{gift.user.username}</LabeledItem>

			<LabeledItem label="Delivered">
				<div className="flex items-center gap-x-10">
					<span>{delivered}</span>
					{currentUser?.role === 'santa' && (
						<UpdateDeliveredStatusAction gift={gift} />
					)}
				</div>
			</LabeledItem>
		</li>
	);
};

export const GiftList = ({
	gifts,
	user: currentUser
}: {
	gifts: Gift[];
	user: User | null;
}) => (
	<ul className="flex flex-col gap-y-2">
		{gifts.map(gift => (
			<GiftListItem key={gift.id} gift={gift} currentUser={currentUser} />
		))}
	</ul>
);
