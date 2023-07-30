const fs = require("fs");

type Match = {
  matchId: string;
  homeSquadId: number;
  homeSquadName: string;
  awaySquadId: number;
  awaySquadName: string;
  roundNumber: number;
};

type Fixture = {
  fixture: {
    match: Match[];
  };
};

type PlayerInfo = {
  firstname: string;
  surname: string;
  playerId: number;
  positionCode: string;
  teamId: number;
};

type PlayerMatchStats = {
  squadId: number;
  startingPositionCode: string;
  currentPositionCode: string;
  playerId: number;
  goals: number;
  goalMisses: number;
  rebounds: number;
  feeds: number;
  goalAssists: number;
  centrePassReceives: number;
  blocks: number;
  intercepts: number;
  deflections: number;
  pickups: number;
  penalties: number;
  generalPlayTurnovers: number;
};

type PlayerData = PlayerInfo & {
  matchStats: (PlayerMatchStats | undefined)[];
};

type MatchStats = {
  matchStats: {
    matchInfo: Match;
    playerStats: {
      player: PlayerMatchStats[];
    };
    playerInfo: {
      player: PlayerInfo[];
    };
  };
};

async function fetchFixture(competitionId: string): Promise<Match[] | undefined> {
  try {
    const result = await fetch(`https://mc.championdata.com/data/${competitionId}/fixture.json`);
    return ((await result.json()) satisfies Fixture).fixture.match;
  } catch (e) {
    console.error("Failed to fetch competition fixture:", e);
  }
}

async function fetchMatchStats(competitionId: string, matchId: string): Promise<MatchStats | undefined> {
  try {
    const result = await fetch(`https://mc.championdata.com/data/${competitionId}/${matchId}.json`);
    return (await result.json()) satisfies MatchStats;
  } catch (e) {
    console.error("Failed to fetch match:", e);
  }
}

async function main() {
  const competitionId = process.env.COMPETITION_ID || "12045";

  const matches = await fetchFixture(competitionId);

  const players = new Map<number, PlayerData>();

  if (matches) {
    const matchData = await Promise.all(matches?.map((match) => fetchMatchStats(competitionId, match.matchId)));

    matchData.forEach((match) => {
      if (match) {
        match.matchStats.playerInfo.player.forEach((player) => {
          const stats = match.matchStats.playerStats.player.find((p) => p.playerId === player.playerId);

          if (stats !== undefined) {
            if (players.has(player.playerId)) {
              const currentPlayer = players.get(player.playerId)!;
              const matchStats = currentPlayer.matchStats;
              matchStats[match.matchStats.matchInfo.roundNumber] = stats;
              players.set(player.playerId, {
                ...currentPlayer,
                positionCode:
                  stats.startingPositionCode !== "-"
                    ? stats.startingPositionCode
                    : stats.currentPositionCode !== "-"
                    ? stats.currentPositionCode
                    : player.positionCode,
                matchStats,
              });
            } else {
              const matchStats = [];
              matchStats[match.matchStats.matchInfo.roundNumber] = stats;
              players.set(player.playerId, {
                firstname: player.firstname,
                surname: player.surname,
                playerId: player.playerId,
                teamId: stats.squadId,
                positionCode: player.positionCode,
                matchStats,
              });
            }
          } else {
            console.error("Failed to find stats for player:", player);
          }
        });
      }
    });
  }

  const playerCsvData: any[] = [];

  players.forEach((value, key) => {
    const playerData: { [id: string]: any } = {
      playerId: key,
      name: `${value.firstname} ${value.surname}`,
      teamId: value.teamId,
      position: value.positionCode,
    };
    value.matchStats.forEach((matchStats, index) => {
      playerData[`match${index}`] = matchStats ? calculatePointsForMatch(matchStats, value.positionCode) : 0;
    });
    playerCsvData.push(playerData);
  });

  createCsvData(playerCsvData);
}

function createCsvData(data: any[]) {
  const csvData = [];
  const headers = Object.keys(data[0]);
  csvData.push(headers.join(","));

  data.forEach((row) => {
    const rowData: any[] = [];
    headers.forEach((header) => {
      rowData.push(row[header]);
    });
    csvData.push(rowData.join(","));
  });

  fs.writeFile("data.csv", csvData.join("\n"), "utf8", (err: any) => err && console.error(err));
}

function calculatePointsForMatch(stats: PlayerMatchStats, positionCode: string) {
  return (
    stats.goals * 2 +
    stats.goalMisses * -5 +
    stats.feeds * 1 +
    stats.goalAssists * 2 +
    stats.centrePassReceives * 1 +
    stats.blocks * 10 +
    stats.intercepts * 8 +
    stats.deflections * 6 +
    stats.pickups * 4 +
    stats.penalties * -1 +
    stats.generalPlayTurnovers * -6 +
    stats.rebounds * (positionCode === "GD" || positionCode === "GK" || positionCode === "WD" ? 10 : 5)
  );
}

main();
