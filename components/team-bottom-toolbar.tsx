import React from "react";
import LabelValue from "./label-value";
import Price from "./price";
import IsTeamValidPopover from "./is-team-valid-popover";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { PopoverAnchor, PopoverArrow } from "@radix-ui/react-popover";

type TeamBottomToolbarProps = {
  teamName: string | null;
  numPlayers: number;
  remainingBudget: number;
};

const TeamBottomToolbar = ({ teamName, numPlayers, remainingBudget }: TeamBottomToolbarProps) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 2000);
  }, []);

  return (
    <div className="h-20 w-full fixed bottom-0 inset-x-0 bg-gradient-to-b from-primary to-primary-dark rounded-t-xl">
      <div className="container flex items-center justify-between h-full text-primary-foreground">
        <LabelValue label="Team Name">{teamName}</LabelValue>

        <Popover open={open}>
          <PopoverAnchor>
            <div className="flex gap-4">
              <LabelValue label="Players">
                {numPlayers.toString()}
                <sub className="opacity-80">/10</sub>
              </LabelValue>
              |
              <LabelValue label="Budget">
                <div className="w-full text-right">
                  <Price price={remainingBudget} />
                </div>
              </LabelValue>
            </div>
          </PopoverAnchor>
          <PopoverContent side="top">
            Content
            <PopoverArrow />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default TeamBottomToolbar;
