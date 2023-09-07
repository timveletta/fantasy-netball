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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const formSchema = z.object({
  searchTerm: z.string(),
  sort: z.enum(["name", "priceAsc", "priceDsc"]).optional(),
});

type PlayerListTileProps = {
  players: Prisma.PlayerGetPayload<{ include: { team: true } }>[];
  onAddPlayer: (id: string) => void;
  isTeamFull: boolean;
};

const PlayerList = ({ players, onAddPlayer, isTeamFull }: PlayerListTileProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { searchTerm: "", sort: undefined },
  });
  const watchSearchTerm = form.watch("searchTerm");
  const watchSort = form.watch("sort");
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
      )
      .sort((a, b) =>
        watchSort === "name"
          ? `${a.lastName},${a.firstName}`.localeCompare(`${b.lastName},${b.firstName}`)
          : watchSort === "priceAsc"
          ? a.price - b.price
          : watchSort === "priceDsc"
          ? b.price - a.price
          : 0
      );
  }, [players, selectedPosition, watchSearchTerm, watchSort]);

  return (
    <Form {...form}>
      <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
        <div className="flex flex-col gap-y-4 px-2 sm:px-0">
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
          <div className="flex flex-wrap sm:flex-row flex-col justify-between gap-2">
            <Tabs value={selectedPosition} onValueChange={onTabChange}>
              <TabsList className="flex-1">
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
            <FormField
              control={form.control}
              name="sort"
              render={({ field }) => (
                <FormItem className="flex-1 min-w-[128px] xl:max-w-[192px]">
                  <Select
                    onValueChange={(value: "name" | "priceAsc" | "priceDsc") => field.onChange(value)}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sort" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="priceAsc">Price - Ascending</SelectItem>
                      <SelectItem value="priceDsc">Price - Descending</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <ul className="flex flex-col gap-y-2 lg:max-h-[960px] overflow-y-scroll">
            {filteredPlayers.map((player) => (
              <PlayerListTile key={player.id} onClick={onAddPlayer} disabled={isTeamFull} {...player} />
            ))}
          </ul>
        </div>
      </form>
    </Form>
  );
};

export default PlayerList;
