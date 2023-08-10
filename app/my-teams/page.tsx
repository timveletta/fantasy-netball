import TeamTile from "@/components/team-tile";
import { getUserTeamsByUserId, getUserByClerkId, pollForUserCreatedByClerkId } from "@/lib/actions";
import { auth } from "@clerk/nextjs";

export default async function Page() {
  const { userId: clerkId } = auth();
  const user = await pollForUserCreatedByClerkId(clerkId!);
  const teams = await getUserTeamsByUserId(user?.id!);

  return (
    <div className="container py-8 flex flex-wrap">
      {teams.map((team) => (
        <TeamTile key={team.id} {...team} />
      ))}
      <TeamTile isEmpty />
    </div>
  );
}
