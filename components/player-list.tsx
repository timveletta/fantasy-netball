"use client";
import { Position, Prisma } from "@prisma/client";
import React from "react";
import PlayerListTile from "./player-list-tile";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

type PlayerListTileProps = {
  players: Prisma.PlayerGetPayload<{ include: { team: true } }>[];
  onAddPlayer: (id: string) => void;
  isTeamFull: boolean;
};

const PlayerList = ({ players, onAddPlayer, isTeamFull }: PlayerListTileProps) => {
  const [selectedPosition, setSelectedPosition] = React.useState<"ALL" | Position>("ALL");

  return (
    <div className="border-2 border-slate-400 rounded-lg">
      <Tabs value={selectedPosition} onValueChange={setSelectedPosition} className="w-full">
        <TabsList>
          <TabsTrigger value="ALL">ALL</TabsTrigger>
          <TabsTrigger value={Position.GK}>GK</TabsTrigger>
          <TabsTrigger value={Position.GD}>GD</TabsTrigger>
          <TabsTrigger value={Position.WD}>WD</TabsTrigger>
          <TabsTrigger value={Position.C}>C</TabsTrigger>
          <TabsTrigger value={Position.WA}>WA</TabsTrigger>
          <TabsTrigger value={Position.GA}>GA</TabsTrigger>
          <TabsTrigger value={Position.GS}>GS</TabsTrigger>
        </TabsList>
      </Tabs>
      <ul className="md:overflow-y-scroll md:max-h-[calc(100vh-16rem)] ">
        {players.map((player) => (
          <PlayerListTile key={player.id} onClick={onAddPlayer} disabled={isTeamFull} {...player} />
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
