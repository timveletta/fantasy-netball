import React from "react";
import LabelValue from "./label-value";
import Price from "./price";

type TeamBottomToolbarProps = {
  teamName: string | null;
  numPlayers: number;
  remainingBudget: number;
};

const TeamBottomToolbar = ({ teamName, numPlayers, remainingBudget }: TeamBottomToolbarProps) => {
  return (
    <div className="h-20 w-full fixed bottom-0 inset-x-0 bg-gradient-to-b from-primary to-primary-dark rounded-t-xl">
      <div className="container flex items-center justify-between h-full text-primary-foreground">
        <LabelValue label="Team Name">{teamName}</LabelValue>

        <div className="flex gap-4">
          <LabelValue label="Players">
            {numPlayers.toString()}
            <sub className="opacity-80">/10</sub>
          </LabelValue>
          |
          <LabelValue label="Remaining Budget">
            <Price price={remainingBudget} />
          </LabelValue>
        </div>
      </div>
    </div>
  );
};

export default TeamBottomToolbar;
