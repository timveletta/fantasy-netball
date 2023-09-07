import React from "react";
import { Alert, AlertDescription } from "./ui/alert";
import { Position, Prisma } from "@prisma/client";
import { groupBy } from "@/utils";
import { Popover, PopoverContent } from "./ui/popover";
import { PopoverAnchor, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "./ui/button";

type IsTeamValidPopoverProps = {
  isValid?: boolean;
  players?: Prisma.PlayersOnUserTeamsGetPayload<{
    include: { player: { include: { team: true } } };
  }>[];
};

const IsTeamValidPopover = ({ isValid, players }: IsTeamValidPopoverProps) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 2000);
  }, []);

  // const hasEnoughPlayers = React.useMemo(() => players.length === 10, [players]);

  // const missingPositions = React.useMemo(() => {
  //   const positions = players.map((p) => p.player.position);
  //   return [Position.GK, Position.GD, Position.WD, Position.C, Position.WA, Position.GA, Position.GS].filter(
  //     (p) => !positions.includes(p)
  //   );
  // }, [players]);

  // const hasTooManyPlayersFromOneTeam = React.useMemo(() => {
  //   const teamGroups = groupBy(players, (p) => p.player.team.name);
  //   return Object.keys(teamGroups).find((teamKey) => teamGroups[teamKey].length > 3);
  // }, [players]);

  // const isTooExpensive = React.useMemo(() => {
  //   return players.reduce((acc, curr) => acc + curr.player.price, 0) > 750000;
  // }, [players]);

  return (
    <Popover open={open}>
      <PopoverTrigger />
      <PopoverContent side="top">
        This is the popover content.
        {/* <h3 className="font-bold text-lg">{isValid ? "Team is valid" : "Team is not valid"}</h3>
        <ul className="list-none space-y-2">
          {!hasEnoughPlayers && <li>You need exactly 10 players on your team.</li>}
          {missingPositions.length !== 0 && (
            <li>You&apos;re missing players in the following positions: {missingPositions.join(", ")}</li>
          )}
          {hasTooManyPlayersFromOneTeam && (
            <li>You have too many players from the {hasTooManyPlayersFromOneTeam} on your team.</li>
          )}
          {isTooExpensive && <li>Your team is exceeding the salary cap.</li>}
        </ul> */}
      </PopoverContent>
    </Popover>
  );
};

export default IsTeamValidPopover;
