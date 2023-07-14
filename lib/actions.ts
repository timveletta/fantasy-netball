'use server';
import prisma from '@/lib/prisma';
import { revalidateTag } from 'next/cache';

export async function addUserTeamToUser(teamName: string, userId: string) {
	return await prisma.user.update({
		data: {
			teams: {
				create: [{ name: teamName }],
			},
		},
		where: { id: userId },
	});
}

export async function getUserTeamsByUserId(userId: string) {
	return await prisma.userTeam.findMany({
		where: { userId },
	});
}

export async function addPlayerToUserTeam(playerId: string, teamId: string) {
	const result = await prisma.userTeam.update({
		data: {
			players: {
				connect: [{ id: playerId }],
			},
		},
		where: { id: teamId },
	});

	revalidateTag('userTeam');

	return result;
}

export async function removePlayerFromUserTeam(
	playerId: string,
	teamId: string
) {
	const result = await prisma.userTeam.update({
		data: {
			players: {
				disconnect: [{ id: playerId }],
			},
		},
		where: { id: teamId },
	});

	revalidateTag('userTeam');

	return result;
}

export async function getUserTeam(teamId: string) {
	return await prisma.userTeam.findUniqueOrThrow({
		where: { id: teamId },
		include: {
			players: {
				include: {
					team: true,
				},
			},
		},
	});
}

export async function getPlayers() {
	return await prisma.player.findMany({
		where: { position: { not: '-' } },
		include: { team: true },
	});
}

export async function getUserByClerkId(clerkId: string) {
	return await prisma.user.findUniqueOrThrow({
		where: { clerkId },
	});
}
