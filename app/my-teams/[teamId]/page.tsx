import TeamBuilder from "@/components/team-builder";
import { getPlayers, getUserTeam } from "@/lib/actions";
import React from "react";

const Page = async ({ params }: { params: { teamId: string } }) => {
  const userTeam = await getUserTeam(params.teamId);
  const players = await getPlayers();

  const availablePlayers = players
    .filter((player) => userTeam.players.every((p) => p.playerId !== player.id))
    .sort((a, b) => a.lastName.localeCompare(b.lastName));

  return (
    <div className="container py-8">
      <h1>Team {userTeam.name}</h1>
      <TeamBuilder userTeam={userTeam} players={availablePlayers} />
    </div>
  );
};

export default Page;
