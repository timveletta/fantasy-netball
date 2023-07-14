'use client';
import { Prisma } from '@prisma/client';
import { TrashIcon } from '@heroicons/react/24/outline';
import React from 'react';

type UserTeamListTileProps = Prisma.PlayerGetPayload<{
	include: { team: true };
}> & {
	onDeleteClicked(id: string): void;
};

const UserTeamListTile = ({
	id,
	firstName,
	lastName,
	position,
	team,
	onDeleteClicked,
}: UserTeamListTileProps) => {
	return (
		<div className="flex items-center p-4 gap-4">
			<span className="text-slate-500 text-lg font-bold w-12">{position}</span>
			<div className="flex flex-col mr-auto">
				<strong className="text-slate-900 text-sm font-medium">
					{lastName}, {firstName}
				</strong>
				<span className="text-slate-500 text-sm font-medium">{team.name}</span>
			</div>
			<button
				className="p-2 hover:bg-red-100 rounded-full text-slate-400 hover:text-red-800"
				onClick={() => onDeleteClicked(id)}
			>
				<TrashIcon className="h-6 w-6 " />
			</button>
		</div>
	);
};

export default UserTeamListTile;
