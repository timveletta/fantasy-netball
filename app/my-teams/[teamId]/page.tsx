import React from 'react';

const Page = ({ params }: { params: { teamId: string } }) => {
	return <div className="container py-8">Team {params.teamId}</div>;
};

export default Page;
