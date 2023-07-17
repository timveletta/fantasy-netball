import { cn } from "@/utils";
import Link from "next/link";
import React from "react";

type TeamTileProps = {
  id?: string;
  name?: string | null;
  isEmpty?: boolean;
};

const TeamTile = ({ id, name, isEmpty = false }: TeamTileProps) => {
  return (
    <Link
      className={cn(
        "w-64 h-64 mr-4 mb-4 flex justify-center items-center rounded-lg cursor-pointer ",
        isEmpty && "border-4 border-dashed border-slate-400 hover:bg-slate-200",
        !isEmpty && "bg-slate-100 hover:bg-slate-200"
      )}
      href={isEmpty ? "/my-teams/create" : `/my-teams/${id}`}
    >
      {isEmpty ? <>Add Team</> : <>{name}</>}
    </Link>
  );
};

export default TeamTile;
