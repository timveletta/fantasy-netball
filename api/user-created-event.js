module.exports = (request, response) => {
	console.log(request);

	response.status(200).json({
		body: request.body,
		query: request.query,
		cookies: request.cookies,
	});
};
