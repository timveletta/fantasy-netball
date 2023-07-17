"use client";
import { Position, Prisma } from "@prisma/client";
import { TrashIcon } from "@heroicons/react/24/outline";
import React from "react";

type UserTeamPlayerTileProps = {
  fixedPosition: Position;
  player?: Prisma.PlayerGetPayload<{
    include: { team: true };
  }>;
  onRemoveClicked(id: string): void;
};

const UserTeamPlayerTile = ({ player, fixedPosition, onRemoveClicked: onDeleteClicked }: UserTeamPlayerTileProps) => {
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
          <button
            className="p-2 hover:bg-red-100 rounded-full text-slate-400 hover:text-red-800"
            onClick={() => onDeleteClicked(player.id)}
          >
            <TrashIcon className="h-6 w-6 " />
          </button>
        </>
      )}
    </div>
  );
};

export default UserTeamPlayerTile;
