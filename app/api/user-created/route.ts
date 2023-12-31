import { UserWebhookEvent } from '@clerk/nextjs/dist/types/server';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const { type, data }: UserWebhookEvent = await request.json();
	if (type === 'user.created' && data.object === 'user') {
		const { id } = data;

		await prisma.user.create({
			data: {
				clerkId: id,
			},
		});
	}

	return NextResponse.json({ ok: true });
}
