'use client';
import { Prisma } from '@prisma/client';
import React from 'react';
import UserTeamListTile from './user-team-list-tile';
import { removePlayerFromUserTeam } from '@/lib/actions';

type UserTeamListProps = {
	team: Prisma.UserTeamGetPayload<{
		include: { players: { include: { team: true } } };
	}>;
};

const UserTeamList = ({ team }: UserTeamListProps) => {
	const players = team.players;

	const onPlayerDelete = async (id: string) => {
		await removePlayerFromUserTeam(id, team.id);
	};

	return (
		<div>
			{players.map((player) => (
				<UserTeamListTile
					key={player.id}
					onDeleteClicked={onPlayerDelete}
					{...player}
				/>
			))}
		</div>
	);
};

export default UserTeamList;
