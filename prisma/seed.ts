// import { Prisma, PrismaClient, Position, Player } from "@prisma/client";
// import fetch from "node-fetch";

// const prisma = new PrismaClient();

// type Match = {
//   matchId: string;
//   homeSquadId: number;
//   homeSquadName: string;
//   homeSquadShortCode: string;
//   awaySquadId: number;
//   awaySquadName: string;
//   awaySquadShortCode: string;
// };

// type Fixture = {
//   fixture: {
//     match: Match[];
//   };
// };

// type PlayerMatchStats = {
//   squadId: number;
//   startingPositionCode: string;
//   currentPositionCode: string;
//   playerId: number;
//   goals: number;
//   goalMisses: number;
//   rebounds: number;
//   feeds: number;
//   goalAssists: number;
//   centrePassReceives: number;
//   blocks: number;
//   intercepts: number;
//   deflections: number;
//   pickups: number;
//   penalties: number;
//   generalPlayTurnovers: number;
// };

// type MatchStats = {
//   matchStats: {
//     playerStats: {
//       player: PlayerMatchStats[];
//     };
//     playerInfo: {
//       player: { firstname: string; surname: string; playerId: number }[];
//     };
//   };
// };

// async function main() {
//   const competitionId = process.env.COMPETITION_ID || "12045";

//   const matches = await fetchFixture(competitionId);

//   if (matches) {
//     const teams = new Map<number, Prisma.TeamUncheckedCreateInput>(
//       matches.map((match) => [
//         match.homeSquadId,
//         {
//           cdId: match.homeSquadId.toString(),
//           name: match.homeSquadName,
//           shortCode: match.homeSquadShortCode,
//           competitionId,
//         },
//       ])
//     );
//     const players = new Map<number, Prisma.PlayerUncheckedCreateInput & { points: number }>();
//     const matchData = await Promise.all(matches?.map((match) => fetchMatchStats(competitionId, match.matchId)));

//     let totalPoints = 0;

//     matchData.forEach((match) => {
//       if (match) {
//         match.matchStats.playerInfo.player.forEach((player) => {
//           const stats = match.matchStats.playerStats.player.find((p) => p.playerId === player.playerId);

//           if (stats !== undefined) {
//             const position: Position =
//               stats.startingPositionCode in Position
//                 ? (stats.startingPositionCode as Position)
//                 : stats.currentPositionCode in Position
//                 ? (stats.currentPositionCode as Position)
//                 : Position.BENCH;
//             const prevPlayer = players.get(player.playerId);
//             const playerMatchPoints = calculatePointsForMatch(stats, position);

//             players.set(player.playerId, {
//               firstName: player.firstname,
//               lastName: player.surname,
//               cdId: player.playerId.toString(),
//               teamId: stats.squadId.toString(),
//               ...prevPlayer,
//               position: prevPlayer && prevPlayer?.position !== Position.BENCH ? prevPlayer.position : position,
//               points: (prevPlayer?.points || 0) + playerMatchPoints,
//             });

//             totalPoints += playerMatchPoints;
//           } else {
//             console.error("Failed to find stats for player:", player);
//           }
//         });
//       }
//     });

//     for (let team of teams.values()) {
//       const result = await prisma.team.upsert({
//         where: { cdId: team.cdId },
//         update: team,
//         create: team,
//       });
//       console.log("Created team: ", result.id, result.name);
//     }

//     // $750,000 is the total salary cap for an SSN team, there are 8 teams so work out how much each point is worth
//     const pointsMultiplier = (8 * 750000) / totalPoints;
//     const minPrice = 43000;

//     for (let { teamId, position, points, ...player } of players.values()) {
//       const price = Math.max(Math.round((points * pointsMultiplier) / 1000) * 1000, minPrice);
//       prisma.player
//         .upsert({
//           where: { cdId: player.cdId },
//           update: {
//             ...player,
//             position,
//             price,
//             team: { connect: { cdId: teamId } },
//           },
//           create: {
//             ...player,
//             position,
//             price,
//             team: { connect: { cdId: teamId } },
//           },
//         })
//         .then((result: Prisma.PlayerGetPayload<{}>) => {
//           console.log("Created player: ", result.id, result.firstName, result.lastName, result.position);
//         });
//     }
//   }
// }

// async function fetchFixture(competitionId: string): Promise<Match[] | undefined> {
//   try {
//     const result = await fetch(`https://mc.championdata.com/data/${competitionId}/fixture.json`);
//     return ((await result.json()) satisfies Fixture).fixture.match;
//   } catch (e) {
//     console.error("Failed to fetch competition fixture:", e);
//   }
// }

// async function fetchMatchStats(competitionId: string, matchId: string): Promise<MatchStats | undefined> {
//   try {
//     const result = await fetch(`https://mc.championdata.com/data/${competitionId}/${matchId}.json`);
//     return (await result.json()) satisfies MatchStats;
//   } catch (e) {
//     console.error("Failed to fetch match:", e);
//   }
// }

// function calculatePointsForMatch(stats: PlayerMatchStats, positionCode: string) {
//   return (
//     stats.goals * 2 +
//     stats.goalMisses * -5 +
//     stats.feeds * 1 +
//     stats.goalAssists * 2 +
//     stats.centrePassReceives * 1 +
//     stats.blocks * 10 +
//     stats.intercepts * 8 +
//     stats.deflections * 6 +
//     stats.pickups * 4 +
//     stats.penalties * -1 +
//     stats.generalPlayTurnovers * -6 +
//     stats.rebounds * (positionCode === "GD" || positionCode === "GK" || positionCode === "WD" ? 10 : 5)
//   );
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
