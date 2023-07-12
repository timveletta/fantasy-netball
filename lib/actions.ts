'use server';
import prisma from '@/lib/prisma';

export async function addTeamToUser(teamName: string, userId: string) {
	return await prisma.user.update({
		data: {
			teams: {
				create: [{ name: teamName }],
			},
		},
		where: { id: userId },
	});
}

export async function getTeamsByUserId(userId: string) {
	return await prisma.userTeam.findMany({
		where: { userId },
	});
}

export async function getTeam(teamId: string) {
	return await prisma.userTeam.findUniqueOrThrow({
		where: { id: teamId },
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
