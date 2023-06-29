import type { WebhookEvent } from '@clerk/clerk-sdk-node';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(
	request: VercelRequest,
	response: VercelResponse
) {
	const event = request.body.evt as WebhookEvent;

	console.log(event);

	response.status(200).json({
		body: request.body,
		query: request.query,
		cookies: request.cookies,
	});
}
