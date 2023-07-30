import TeamBuilder from "@/components/team-builder";
import { getPlayers, getUserTeam } from "@/lib/actions";
import React from "react";

const Page = async ({ params }: { params: { teamId: string } }) => {
  const userTeam = await getUserTeam(params.teamId);
  const players = await getPlayers();

  const availablePlayers = players
    .filter((player) => userTeam.players.every((p) => p.playerId !== player.id))
    .sort((a, b) => a.lastName.localeCompare(b.lastName));

  const teamPrice = userTeam.players.reduce((acc, player) => acc + player.player.price, 0);

  return (
    <div className="container py-8">
      <div className="flex justify-between">
        <h1>Team {userTeam.name}</h1>
        <span className="text-slate-500 text-lg font-bold">
          ${teamPrice.toLocaleString()}/${(750000).toLocaleString()}
        </span>
      </div>
      <TeamBuilder userTeam={userTeam} players={availablePlayers} />
    </div>
  );
};

export default Page;
