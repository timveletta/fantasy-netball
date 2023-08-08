"use client";
import PlayerList from "@/components/player-list";
import UserTeamList from "@/components/user-team-list";
import { addPlayerToUserTeam, removePlayerFromUserTeam, updatePlayerPositionInUserTeam } from "@/lib/actions";
import { Position, Prisma } from "@prisma/client";
import React from "react";
import IsTeamValidAlert from "./is-team-valid-alert";
import ErrorAlert from "./error-alert";
import NetballCourt from "./netball-court";
import Text from "@/components/text";
import LabelValue from "./label-value";
import TeamBottomToolbar from "./team-bottom-toolbar";

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
  const remainingBudget = 750000 - userTeam.players.reduce((acc, player) => acc + player.player.price, 0);

  return (
    <>
      <div className="grid lg:grid-cols-[600px,1fr] xl:grid-cols-[700px,1fr] lg:gap-8 md:gap-4 gap-2">
        <UserTeamList
          players={userTeam.players}
          onRemovePlayer={onRemovePlayer}
          onUpdatePlayerPosition={onUpdatePlayerPosition}
        />
        <PlayerList players={players} onAddPlayer={onAddPlayer} isTeamFull={isTeamFull} />
      </div>
      <TeamBottomToolbar
        teamName={userTeam.name}
        numPlayers={userTeam.players.length}
        remainingBudget={remainingBudget}
      />
    </>
  );
};

export default TeamBuilder;
