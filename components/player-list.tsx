"use client";
import { Position, Prisma } from "@prisma/client";
import React from "react";
import PlayerListTile from "./player-list-tile";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";

type PlayerListTileProps = {
  players: Prisma.PlayerGetPayload<{ include: { team: true } }>[];
  onAddPlayer: (id: string) => void;
  isTeamFull: boolean;
};

const PlayerList = ({ players, onAddPlayer, isTeamFull }: PlayerListTileProps) => {
  const [selectedPosition, setSelectedPosition] = React.useState<"ALL" | Position>("ALL");

  const onTabChange = (value: string) => {
    if (value === "ALL" || value in Position) {
      setSelectedPosition(value as "ALL" | Position);
    }
  };

  const filteredPlayers = React.useMemo(() => {
    if (selectedPosition === "ALL") {
      return players;
    }

    return players.filter((player) => player.position === selectedPosition);
  }, [players, selectedPosition]);

  return (
    <div className="">
      <Input placeholder="Search" />
      <Tabs value={selectedPosition} onValueChange={onTabChange}>
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
      <ul className="flex flex-col gap-y-2">
        {filteredPlayers.map((player) => (
          <PlayerListTile key={player.id} onClick={onAddPlayer} disabled={isTeamFull} {...player} />
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
