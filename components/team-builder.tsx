"use client";
import PlayerList from "@/components/player-list";
import UserTeamList from "@/components/user-team-list";
import { addPlayerToUserTeam, removePlayerFromUserTeam, updatePlayerPositionInUserTeam } from "@/lib/actions";
import { Position, Prisma } from "@prisma/client";
import React from "react";
import IsTeamValidAlert from "./is-team-valid-alert";
import ErrorAlert from "./error-alert";

type TeamBuilderProps = {
  userTeam: Prisma.UserTeamGetPayload<{
    include: { players: { include: { player: { include: { team: true } } } } };
  }>;
  players: Prisma.PlayerGetPayload<{ include: { team: true } }>[];
};

const TeamBuilder = ({ userTeam, players }: TeamBuilderProps) => {
  const [error, setError] = React.useState<string | null>(null);

  const onAddPlayer = async (id: string) => {
    try {
      setError(null);
      await addPlayerToUserTeam(id, userTeam.id);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const onRemovePlayer = async (id: string) => {
    await removePlayerFromUserTeam(id, userTeam.id);
  };

  const onUpdatePlayerPosition = async (id: string, position: Position) => {
    await updatePlayerPositionInUserTeam(id, userTeam.id, position);
  };

  const isTeamFull = userTeam.players.length >= 10;

  return (
    <div className="grid md:grid-cols-[1fr,400px] gap-4">
      <div>
        <ErrorAlert message={error} />
        <IsTeamValidAlert isValid={userTeam.isValid} players={userTeam.players} />
        <UserTeamList
          players={userTeam.players}
          onRemovePlayer={onRemovePlayer}
          onUpdatePlayerPosition={onUpdatePlayerPosition}
        />
      </div>
      <PlayerList players={players} onAddPlayer={onAddPlayer} isTeamFull={isTeamFull} />
    </div>
  );
};

export default TeamBuilder;
