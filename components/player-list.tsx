"use client";
import { Position, Prisma } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import * as z from "zod";
import React from "react";
import PlayerListTile from "./player-list-tile";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";

const formSchema = z.object({
  searchTerm: z.string(),
});

type PlayerListTileProps = {
  players: Prisma.PlayerGetPayload<{ include: { team: true } }>[];
  onAddPlayer: (id: string) => void;
  isTeamFull: boolean;
};

const PlayerList = ({ players, onAddPlayer, isTeamFull }: PlayerListTileProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { searchTerm: "" },
  });
  const watchSearchTerm = form.watch("searchTerm");
  const [selectedPosition, setSelectedPosition] = React.useState<"ALL" | Position>("ALL");

  const onTabChange = (value: string) => {
    if (value === "ALL" || value in Position) {
      setSelectedPosition(value as "ALL" | Position);
    }
  };

  const filteredPlayers = React.useMemo(() => {
    return players
      .filter((player) => selectedPosition === "ALL" || player.position === selectedPosition)
      .filter((player) =>
        `${player.firstName} ${player.lastName} ${player.team.name}`
          .toLowerCase()
          .includes(watchSearchTerm.toLowerCase())
      );
  }, [players, selectedPosition, watchSearchTerm]);

  return (
    <div className="flex flex-col gap-y-4">
      <Form {...form}>
        <form autoComplete="off">
          <FormField
            control={form.control}
            name="searchTerm"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Search players..." />
                </FormControl>
                {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div>
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
      </div>
      <ul className="flex flex-col gap-y-2">
        {filteredPlayers.map((player) => (
          <PlayerListTile key={player.id} onClick={onAddPlayer} disabled={isTeamFull} {...player} />
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
