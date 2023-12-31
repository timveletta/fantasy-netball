"use client";
import { Position, Prisma } from "@prisma/client";
import { ArrowsUpDownIcon, BarsArrowUpIcon, MinusIcon, TrashIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Button } from "./ui/button";
import { cn, formatPosition } from "@/utils";
import Price from "./price";
import { IconButton } from "./ui/icon-button";
import Image from "next/image";

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
    <div
      className={cn(
        "flex items-center p-4 gap-4 h-20 rounded-lg",
        !player && "bg-secondary-light",
        player && "bg-secondary-dark"
      )}
    >
      {player ? (
        <>
          <div className="h-12 w-12 aspect-square rounded-full bg-background flex items-center justify-center overflow-clip">
            {player.team.logoUrl && (
              <Image alt="Team Logo" width={40} height={40} src={player.team.logoUrl} className="h-10 w-10" />
            )}
          </div>

          <div className="flex flex-col mr-auto">
            <strong className="text-primary-foreground md:text-lg font-bold line-clamp-1">
              {player.lastName}, {player.firstName}
            </strong>
            <span className="text-primary-foreground text-sm font-medium">{formatPosition(player.position)}</span>
          </div>
          <span className="font-bold text-primary-foreground">
            <Price price={player.price} />
          </span>
          {fixedPosition === Position.BENCH && onUpdatePlayerPosition && (
            <>
              <IconButton
                className="hidden sm:inline-flex"
                size="sm"
                variant="outline"
                onClick={() => onUpdatePlayerPosition(player.id, player.position)}
              >
                <ArrowsUpDownIcon className="h-6 w-6" />
              </IconButton>
              <IconButton
                className="hidden sm:inline-flex"
                variant="destructive"
                size="sm"
                onClick={() => onDeleteClicked(player.id)}
              >
                <MinusIcon className="h-6 w-6" />
              </IconButton>
            </>
          )}
        </>
      ) : (
        <div className="w-full text-secondary-dark text-lg font-bold text-center">{fixedPosition}</div>
      )}
    </div>
  );
};

export default UserTeamPlayerTile;
