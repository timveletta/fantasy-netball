"use server";
import prisma from "@/lib/prisma";
import { Position, Prisma } from "@prisma/client";
import { revalidateTag } from "next/cache";

export async function addUserTeamToUser(teamName: string, userId: string) {
  const result = await prisma.user.update({
    data: {
      teams: {
        create: [{ name: teamName }],
      },
    },
    where: { id: userId },
    select: {
      teams: {
        where: { name: teamName },
      },
    },
  });

  return result;
}

export async function getUserTeamsByUserId(userId: string) {
  return await prisma.userTeam.findMany({
    where: { userId },
  });
}

function checkTeamIsValid(
  currentPlayers: Prisma.PlayersOnUserTeamsGetPayload<{
    include: { player: { include: { team: true } } };
  }>[],
  playerToBeAdded?: Prisma.PlayerGetPayload<{ include: { team: true } }>,
  positionToBeAdded?: Position
): boolean {
  let isValid = true;

  // exactly 10 players
  if (currentPlayers.length + (playerToBeAdded !== undefined ? 1 : 0) !== 10) {
    isValid = false;
  }

  // no more than 3 players from the same team
  if (
    currentPlayers.filter((p) => p.player.team.id === playerToBeAdded?.team.id).length +
      (playerToBeAdded !== undefined ? 1 : 0) >
    3
  ) {
    isValid = false;
  }

  // at least 1 player in each position
  const teamPositions = currentPlayers
    .map((p) => p.currentPosition)
    .concat(positionToBeAdded ? [positionToBeAdded] : []);
  if (
    teamPositions.filter((p) => p === Position.GK).length !== 1 ||
    teamPositions.filter((p) => p === Position.GD).length !== 1 ||
    teamPositions.filter((p) => p === Position.WD).length !== 1 ||
    teamPositions.filter((p) => p === Position.C).length !== 1 ||
    teamPositions.filter((p) => p === Position.WA).length !== 1 ||
    teamPositions.filter((p) => p === Position.GA).length !== 1 ||
    teamPositions.filter((p) => p === Position.GS).length !== 1 ||
    teamPositions.filter((p) => p === Position.BENCH).length !== 3
  ) {
    isValid = false;
  }

  return isValid;
}

export async function addPlayerToUserTeam(playerId: string, teamId: string) {
  const player = await prisma.player.findUniqueOrThrow({
    where: { id: playerId },
    include: { team: true },
  });
  const userTeam = await getUserTeam(teamId);

  // place player in team
  const currentPosition: Position = userTeam.players.find((p) => p.currentPosition === player.position)
    ? Position.BENCH
    : (player.position as Position);

  // team cannot have more than 10 players
  if (userTeam.players.length + 1 > 10) {
    throw new Error("Your team cannot have more than 10 players");
  }

  // team cannot have more than 3 players on the bench
  if (
    currentPosition === Position.BENCH &&
    userTeam.players.filter((p) => p.currentPosition === Position.BENCH).length + 1 > 3
  ) {
    throw new Error("Your team cannot have more than 3 players on the bench");
  }

  const isValid = checkTeamIsValid(userTeam.players, player, currentPosition);

  const result = await prisma.userTeam.update({
    data: {
      isValid,
      players: {
        create: [{ playerId, currentPosition }],
      },
    },
    where: { id: teamId },
  });

  revalidateTag("userTeam");

  return result;
}

export async function removePlayerFromUserTeam(playerId: string, teamId: string) {
  const userTeam = await getUserTeam(teamId);

  const isValid = checkTeamIsValid(userTeam.players.filter((p) => p.playerId !== playerId));

  const result = await prisma.userTeam.update({
    data: {
      isValid,
      players: {
        delete: [
          {
            userTeamId_playerId: {
              playerId,
              userTeamId: teamId,
            },
          },
        ],
      },
    },
    where: { id: teamId },
  });

  revalidateTag("userTeam");

  return result;
}

export async function updatePlayerPositionInUserTeam(playerId: string, teamId: string, newPosition: Position) {
  const userTeam = await getUserTeam(teamId);
  const player = userTeam.players.find((p) => p.playerId === playerId);

  if (!player) {
    throw new Error("Player not found in team");
  }

  // team cannot have more than 3 players on the bench
  if (
    newPosition === Position.BENCH &&
    userTeam.players.filter((p) => p.currentPosition === Position.BENCH).length + 1 > 3
  ) {
    throw new Error("Your team cannot have more than 3 players on the bench");
  }

  const currentPlayerInPosition =
    newPosition === Position.BENCH ? undefined : userTeam.players.find((p) => p.currentPosition === newPosition);
  const temporaryTeam = userTeam.players
    .filter((p) => p.playerId !== playerId && p.playerId !== currentPlayerInPosition?.playerId)
    .concat(currentPlayerInPosition ? [{ ...currentPlayerInPosition, currentPosition: player.currentPosition }] : [])
    .concat([{ ...player, currentPosition: newPosition }]);

  const isValid = checkTeamIsValid(temporaryTeam);

  const result = await prisma.userTeam.update({
    data: {
      isValid,
      players: {
        update: [
          {
            where: {
              userTeamId_playerId: {
                playerId,
                userTeamId: teamId,
              },
            },
            data: {
              currentPosition: newPosition,
            },
          },
        ].concat(
          currentPlayerInPosition
            ? [
                {
                  where: {
                    userTeamId_playerId: {
                      playerId: currentPlayerInPosition.playerId,
                      userTeamId: teamId,
                    },
                  },
                  data: {
                    currentPosition: player.currentPosition,
                  },
                },
              ]
            : []
        ),
      },
    },
    where: { id: teamId },
  });

  revalidateTag("userTeam");

  return result;
}

export async function getUserTeam(teamId: string) {
  return await prisma.userTeam.findUniqueOrThrow({
    where: { id: teamId },
    include: {
      players: {
        include: {
          player: { include: { team: true } },
        },
      },
    },
  });
}

export async function getPlayers() {
  return await prisma.player.findMany({
    where: { position: { not: "BENCH" } },
    include: { team: true },
  });
}

export async function getUserByClerkId(clerkId: string) {
  return await prisma.user.findUniqueOrThrow({
    where: { clerkId },
  });
}
