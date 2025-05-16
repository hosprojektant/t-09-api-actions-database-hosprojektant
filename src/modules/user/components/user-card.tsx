'use client';

import type { InferSelectModel } from 'drizzle-orm';

import { LabeledItem } from '@/components/labeled-item';
import { type users } from '@/db/schema';

type User = InferSelectModel<typeof users>;

export const UserCard = ({
	user,
	giftCount
}: {
	user: User;
	giftCount: number;
}) => (
	<div className="flex flex-col gap-y-4">
		<div className="grid gap-10 rounded-md bg-white px-8 py-4 md:grid-cols-2 lg:grid-cols-4">
			<LabeledItem label="User">{user.name}</LabeledItem>
			<LabeledItem label="Username">{user.username}</LabeledItem>
			<LabeledItem label="Role">{user.role}</LabeledItem>
			<LabeledItem label="ID">{user.id}</LabeledItem>
		</div>

		{user.role === 'user' && (
			<div className="grid gap-10 rounded-md bg-white px-8 py-4 md:grid-cols-2 lg:grid-cols-4">
				<LabeledItem label="Gifts count">{giftCount}</LabeledItem>
			</div>
		)}
	</div>
);
