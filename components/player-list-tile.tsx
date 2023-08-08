"use client";
import { cn } from "@/utils";
import { Prisma } from "@prisma/client";
import React from "react";
import Price from "./price";
import { PlusIcon } from "@heroicons/react/24/outline";
import { IconButton } from "./ui/icon-button";

type PlayerListTileProps = Prisma.PlayerGetPayload<{
  include: { team: true };
}> & {
  onClick(id: string): void;
  disabled?: boolean;
};

const PlayerListTile = ({
  id,
  firstName,
  lastName,
  position,
  team,
  price,
  onClick,
  disabled = false,
}: PlayerListTileProps) => {
  return (
    <li
      className={cn(
        "flex items-center p-4 border-b gap-4 bg-white rounded-lg",
        disabled && "opacity-50",
        !disabled && "cursor-pointer hover:bg-slate-100 hover:drop-shadow"
      )}
    >
      <div className="h-10 w-10 aspect-square bg-gray-300 rounded-full">{/* placeholder for team image */}</div>
      <div className="flex flex-col mr-auto">
        <strong className="font-bold line-clamp-1">
          {lastName}, {firstName}
        </strong>
        <span className="text-sm font-medium">{position}</span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold opacity-80">
          <Price price={price} />
        </span>
      </div>
      <div>
        <IconButton size="sm" onClick={() => !disabled && onClick(id)}>
          <PlusIcon className="h-6 w-6" />
        </IconButton>
      </div>
    </li>
  );
};

export default PlayerListTile;
