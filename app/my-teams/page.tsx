import TeamTile from '@/components/team-tile';
import { getTeamsByUserId, getUserByClerkId } from '@/lib/actions';
import { auth } from '@clerk/nextjs';

export default async function Page() {
	const { userId: clerkId } = auth();
	const user = await getUserByClerkId(clerkId!);
	const teams = await getTeamsByUserId(user?.id!);

	return (
		<div className="container py-8 flex space-x-4 flex-wrap">
			{teams.map((team) => (
				<TeamTile key={team.id} {...team} />
			))}
			<TeamTile isEmpty />
		</div>
	);
}
