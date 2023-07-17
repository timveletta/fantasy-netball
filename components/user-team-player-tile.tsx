"use client";
import { Position, Prisma } from "@prisma/client";
import { BarsArrowUpIcon, TrashIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Button } from "./ui/button";

type UserTeamPlayerTileProps = {
  fixedPosition: Position;
  player?: Prisma.PlayerGetPayload<{
    include: { team: true };
  }>;
  onRemoveClicked(id: string): void;
  onUpdatePlayerPosition?: (id: string, position: Position) => void;
};

const UserTeamPlayerTile = ({
  player,
  fixedPosition,
  onRemoveClicked: onDeleteClicked,
  onUpdatePlayerPosition,
}: UserTeamPlayerTileProps) => {
  return (
    <div className="flex items-center p-4 gap-4">
      <span className="text-slate-500 text-lg font-bold w-12">
        {fixedPosition === Position.BENCH ? player?.position : fixedPosition}
      </span>
      {player && (
        <>
          <div className="flex flex-col mr-auto">
            <strong className="text-slate-900 text-sm font-medium">
              {player.lastName}, {player.firstName}
            </strong>
            <span className="text-slate-500 text-sm font-medium">{player.team.name}</span>
          </div>
          {fixedPosition === Position.BENCH && onUpdatePlayerPosition && (
            <Button size="icon" variant="default" onClick={() => onUpdatePlayerPosition(player.id, player.position)}>
              <BarsArrowUpIcon className="h-6 w-6" />
            </Button>
          )}
          <Button size="icon" variant="destructive" onClick={() => onDeleteClicked(player.id)}>
            <TrashIcon className="h-6 w-6" />
          </Button>
        </>
      )}
    </div>
  );
};

export default UserTeamPlayerTile;
