'use client';
import { cn } from '@/utils';
import { Prisma } from '@prisma/client';
import React from 'react';

type PlayerListTileProps = Prisma.PlayerGetPayload<{
	include: { team: true };
}> & {
	onClick(id: string): void;
	disabled?: boolean;
};

const PlayerListTile = ({
	id,
	firstName,
	lastName,
	position,
	team,
	onClick,
	disabled = false,
}: PlayerListTileProps) => {
	return (
		<li
			className={cn(
				'flex items-center p-4 border-b gap-4 ',
				disabled && 'opacity-50',
				!disabled && 'cursor-pointer hover:bg-slate-100'
			)}
			onClick={() => !disabled && onClick(id)}
		>
			<span className="text-slate-500 text-lg font-bold w-12">{position}</span>
			<div className="flex flex-col">
				<strong className="text-slate-900 text-sm font-medium">
					{lastName}, {firstName}
				</strong>
				<span className="text-slate-500 text-sm font-medium">{team.name}</span>
			</div>
		</li>
	);
};

export default PlayerListTile;
