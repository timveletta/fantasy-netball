import { getPlayers, getTeam } from '@/lib/actions';
import React from 'react';

const Page = async ({ params }: { params: { teamId: string } }) => {
	const team = await getTeam(params.teamId);
	const players = await getPlayers();

	return (
		<div className="container py-8">
			<h1>Team {team.name}</h1>
			<div>
				<h2>Players</h2>
				<ul>
					{players.map((player) => (
						<li key={player.id}>
							{player.lastName}, {player.firstName} - {player.position} -{' '}
							{player.team.name}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Page;
