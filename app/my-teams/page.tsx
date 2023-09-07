import TeamTile from "@/components/team-tile";

export default async function Page() {
  // const { userId: clerkId } = auth();
  // const user = await pollForUserCreatedByClerkId(clerkId!);
  // const teams = await getUserTeamsByUserId(user?.id!);

  return (
    <div className="container py-8 flex flex-wrap">
      Teams
      {/* {teams.map((team) => (
        <TeamTile key={team.id} {...team} />
      ))}*/}
      <TeamTile isEmpty />
    </div>
  );
}
