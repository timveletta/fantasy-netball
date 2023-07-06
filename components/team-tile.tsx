import { cn } from '@/utils';
import Link from 'next/link';
import React from 'react';

type TeamTileProps = {
	isEmpty?: boolean;
};

const TeamTile = ({ isEmpty = true }: TeamTileProps) => {
	return (
		<Link
			className={cn(
				'w-64 h-64 flex justify-center items-center bg-slate-100 rounded-lg cursor-pointer hover:bg-slate-200'
			)}
			href="/my-teams/create"
		>
			{isEmpty && <>Add Team</>}
		</Link>
	);
};

export default TeamTile;
