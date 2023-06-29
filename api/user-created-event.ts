import type { VercelRequest, VercelResponse } from '@vercel/node';

module.exports = (request: VercelRequest, response: VercelResponse) => {
	console.log(request);

	response.status(200).json({
		body: request.body,
		query: request.query,
		cookies: request.cookies,
	});
};
