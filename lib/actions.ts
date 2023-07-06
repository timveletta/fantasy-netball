'use server';
import prisma from '@/lib/prisma';

export async function addTeamToUser(teamName: string, userId: string) {
	const team = await prisma.user.update({
		data: {
			teams: {
				create: [{ name: teamName }],
			},
		},
		where: { id: userId },
	});

	return team;
}

export async function getTeamsByUserId(userId: string) {
	const teams = await prisma.userTeam.findMany({
		where: { userId },
	});

	return teams;
}

export async function getUserByClerkId(clerkId: string) {
	const user = await prisma.user.findUnique({
		where: { clerkId },
	});

	return user;
}
