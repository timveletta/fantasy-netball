module.exports = (request, response) => {
	console.log(request.body);

	response.status(200).json({
		body: request.body,
		query: request.query,
		cookies: request.cookies,
	});
};
