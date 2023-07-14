'use client';
import { Prisma } from '@prisma/client';
import React from 'react';
import PlayerListTile from './player-list-tile';
import { addPlayerToUserTeam } from '@/lib/actions';

type PlayerListTileProps = {
	teamId: string;
	players: Prisma.PlayerGetPayload<{ include: { team: true } }>[];
};

const PlayerList = ({ players, teamId }: PlayerListTileProps) => {
	const onPlayerClicked = async (id: string) => {
		await addPlayerToUserTeam(id, teamId);
	};

	return (
		<ul className="md:overflow-y-scroll md:max-h-[calc(100vh-16rem)] border-2 border-slate-400 rounded-lg">
			{players.map((player) => (
				<PlayerListTile key={player.id} onClick={onPlayerClicked} {...player} />
			))}
		</ul>
	);
};

export default PlayerList;
