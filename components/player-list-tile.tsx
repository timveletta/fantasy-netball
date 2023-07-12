'use client';
import { Prisma } from '@prisma/client';
import React from 'react';

type PlayerListTileProps = Prisma.PlayerGetPayload<{
	include: { team: true };
}> & {
	onClick(id: string): void;
};

const PlayerListTile = ({
	id,
	firstName,
	lastName,
	position,
	team,
	onClick,
}: PlayerListTileProps) => {
	return (
		<li
			key={id}
			className="flex items-center p-4 border-b gap-4 cursor-pointer hover:bg-slate-100"
			onClick={() => onClick(id)}
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
