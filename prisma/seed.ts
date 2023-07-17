import { Prisma, PrismaClient, Position } from '@prisma/client';
import fetch from 'node-fetch';

const prisma = new PrismaClient();

type Match = {
	matchId: string;
	homeSquadId: number;
	homeSquadName: string;
	awaySquadId: number;
	awaySquadName: string;
};

type Fixture = {
	fixture: {
		match: Match[];
	};
};

type MatchStats = {
	matchStats: {
		playerStats: {
			player: {
				squadId: number;
				startingPositionCode: string;
				playerId: number;
			}[];
		};
		playerInfo: {
			player: { firstname: string; surname: string; playerId: number }[];
		};
	};
};

async function main() {
	const competitionId = process.env.COMPETITION_ID || '12045';

	const matches = await fetchFixture(competitionId);

	if (matches) {
		const teams = new Map<number, Prisma.TeamUncheckedCreateInput>(
			matches.map((match) => [
				match.homeSquadId,
				{
					cdId: match.homeSquadId.toString(),
					name: match.homeSquadName,
					competitionId,
				},
			])
		);
		const players = new Map<number, Prisma.PlayerUncheckedCreateInput>();

		const matchData = await Promise.all(
			matches?.map((match) => fetchMatchStats(competitionId, match.matchId))
		);

		matchData.forEach((match) => {
			if (match) {
				match.matchStats.playerInfo.player.forEach((player) => {
					const stats = match.matchStats.playerStats.player.find(
						(p) => p.playerId === player.playerId
					);

					if (stats !== undefined) {
						players.set(player.playerId, {
							firstName: player.firstname,
							lastName: player.surname,
							cdId: player.playerId.toString(),
							teamId: stats.squadId.toString(),
							position: stats.startingPositionCode,
						});
					} else {
						console.error('Failed to find stats for player:', player);
					}
				});
			}
		});

		for (let team of teams.values()) {
			const result = await prisma.team.upsert({
				where: { cdId: team.cdId },
				update: team,
				create: team,
			});
			console.log('Created team: ', result.id, result.name);
		}

		for (let { teamId, position: cdPosition, ...player } of players.values()) {
			const position: Position =
				cdPosition in Position ? (cdPosition as Position) : Position.BENCH;

			prisma.player
				.upsert({
					where: { cdId: player.cdId },
					update: {
						...player,
						position,
						team: { connect: { cdId: teamId } },
					},
					create: {
						...player,
						position,
						team: { connect: { cdId: teamId } },
					},
				})
				.then((result) => {
					console.log(
						'Created player: ',
						result.id,
						result.firstName,
						result.lastName,
						result.position
					);
				});
		}
	}
}

async function fetchFixture(
	competitionId: string
): Promise<Match[] | undefined> {
	try {
		const result = await fetch(
			`https://mc.championdata.com/data/${competitionId}/fixture.json`
		);
		return ((await result.json()) satisfies Fixture).fixture.match;
	} catch (e) {
		console.error('Failed to fetch competition fixture:', e);
	}
}

async function fetchMatchStats(
	competitionId: string,
	matchId: string
): Promise<MatchStats | undefined> {
	try {
		const result = await fetch(
			`https://mc.championdata.com/data/${competitionId}/${matchId}.json`
		);
		return (await result.json()) satisfies MatchStats;
	} catch (e) {
		console.error('Failed to fetch match:', e);
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
