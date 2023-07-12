import PlayerList from '@/components/player-list';
import { getPlayers, getTeam } from '@/lib/actions';
import React from 'react';

const Page = async ({ params }: { params: { teamId: string } }) => {
	const team = await getTeam(params.teamId);
	const players = await getPlayers();

	return (
		<div className="container py-8">
			<h1>Team {team.name}</h1>
			<div className="grid md:grid-cols-[1fr,400px]">
				<h2>Players</h2>
				<PlayerList players={players} />
			</div>
		</div>
	);
};

export default Page;
