import PlayerList from '@/components/player-list';
import PlayerListTile from '@/components/player-list-tile';
import { getPlayers, getUserTeam } from '@/lib/actions';
import React from 'react';

const Page = async ({ params }: { params: { teamId: string } }) => {
	const userTeam = await getUserTeam(params.teamId);
	const players = await getPlayers();

	const availablePlayers = players.filter((player) =>
		userTeam.players.every((p) => p.id !== player.id)
	);

	return (
		<div className="container py-8">
			<h1>Team {userTeam.name}</h1>
			<div className="grid md:grid-cols-[1fr,400px]">
				<div>
					<h2>Players</h2>
					<ul>
						{userTeam.players.map((player) => (
							<PlayerListTile key={player.id} {...player} />
						))}
					</ul>
				</div>
				<PlayerList players={availablePlayers} teamId={params.teamId} />
			</div>
		</div>
	);
};

export default Page;
