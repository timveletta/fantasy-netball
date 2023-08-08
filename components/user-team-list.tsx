"use client";
import { Position, Prisma } from "@prisma/client";
import React from "react";
import UserTeamPlayerTile from "./user-team-player-tile";
import NetballCourt from "./netball-court";

type UserTeamListProps = {
  players: Prisma.PlayersOnUserTeamsGetPayload<{
    include: { player: { include: { team: true } } };
  }>[];
  onRemovePlayer: (id: string) => void;
  onUpdatePlayerPosition: (id: string, position: Position) => void;
};

const UserTeamList = ({ players, onRemovePlayer, onUpdatePlayerPosition }: UserTeamListProps) => {
  const findPlayerForPosition = React.useCallback(
    (position: Position) => {
      return players.filter((player) => player.currentPosition === position).map((player) => player.player);
    },
    [players]
  );

  return (
    <div>
      <div className="bg-secondary md:p-8 px-2 py-4 md:rounded-xl flex flex-col gap-y-4 mb-4">
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
      </div>
      <div className="bg-secondary md:p-8 px-2 py-4 md:rounded-xl flex flex-col gap-y-4 mb-4">
        <UserTeamPlayerTile
          fixedPosition={Position.BENCH}
          player={findPlayerForPosition(Position.BENCH)[0]}
          onRemoveClicked={onRemovePlayer}
          onUpdatePlayerPosition={onUpdatePlayerPosition}
        />
        <UserTeamPlayerTile
          fixedPosition={Position.BENCH}
          player={findPlayerForPosition(Position.BENCH)[1]}
          onRemoveClicked={onRemovePlayer}
          onUpdatePlayerPosition={onUpdatePlayerPosition}
        />
        <UserTeamPlayerTile
          fixedPosition={Position.BENCH}
          player={findPlayerForPosition(Position.BENCH)[2]}
          onRemoveClicked={onRemovePlayer}
          onUpdatePlayerPosition={onUpdatePlayerPosition}
        />
      </div>
    </div>
  );
};

export default UserTeamList;
