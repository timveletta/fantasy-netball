"use client";
import { Position, Prisma } from "@prisma/client";
import React from "react";
import UserTeamPlayerTile from "./user-team-player-tile";

type UserTeamListProps = {
  players: Prisma.PlayersOnUserTeamsGetPayload<{
    include: { player: { include: { team: true } } };
  }>[];
  onRemovePlayer: (id: string) => void;
};

const UserTeamList = ({ players, onRemovePlayer }: UserTeamListProps) => {
  const findPlayerForPosition = React.useCallback(
    (position: Position) => {
      return players.filter((player) => player.currentPosition === position).map((player) => player.player);
    },
    [players]
  );

  return (
    <>
      <UserTeamPlayerTile
        fixedPosition={Position.GK}
        player={findPlayerForPosition(Position.GK)[0]}
        onRemoveClicked={onRemovePlayer}
      />
      <UserTeamPlayerTile
        fixedPosition={Position.GD}
        player={findPlayerForPosition(Position.GD)[0]}
        onRemoveClicked={onRemovePlayer}
      />
      <UserTeamPlayerTile
        fixedPosition={Position.WD}
        player={findPlayerForPosition(Position.WD)[0]}
        onRemoveClicked={onRemovePlayer}
      />
      <UserTeamPlayerTile
        fixedPosition={Position.C}
        player={findPlayerForPosition(Position.C)[0]}
        onRemoveClicked={onRemovePlayer}
      />
      <UserTeamPlayerTile
        fixedPosition={Position.WA}
        player={findPlayerForPosition(Position.WA)[0]}
        onRemoveClicked={onRemovePlayer}
      />
      <UserTeamPlayerTile
        fixedPosition={Position.GA}
        player={findPlayerForPosition(Position.GA)[0]}
        onRemoveClicked={onRemovePlayer}
      />
      <UserTeamPlayerTile
        fixedPosition={Position.GS}
        player={findPlayerForPosition(Position.GS)[0]}
        onRemoveClicked={onRemovePlayer}
      />
      <h2>Bench</h2>
      <UserTeamPlayerTile
        fixedPosition={Position.BENCH}
        player={findPlayerForPosition(Position.BENCH)[0]}
        onRemoveClicked={onRemovePlayer}
      />
      <UserTeamPlayerTile
        fixedPosition={Position.BENCH}
        player={findPlayerForPosition(Position.BENCH)[1]}
        onRemoveClicked={onRemovePlayer}
      />
      <UserTeamPlayerTile
        fixedPosition={Position.BENCH}
        player={findPlayerForPosition(Position.BENCH)[2]}
        onRemoveClicked={onRemovePlayer}
      />
    </>
  );
  // return players.map((player) => (
  // 	<UserTeamListTile
  // 		key={player.id}
  //
  // 		{...player}
  // 	/>
  // ));
};

export default UserTeamList;
