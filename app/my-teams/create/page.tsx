import CreateTeamForm from "@/components/create-team-form";
import Text from "@/components/text";
import { getUserByClerkId } from "@/lib/actions";
import { auth } from "@clerk/nextjs";
import React from "react";

const Page = async () => {
  const { userId: clerkId } = auth();
  const user = await getUserByClerkId(clerkId!);

  return (
    <div className="container py-8">
      <Text.Title>Create Team</Text.Title>
      <div className="max-w-lg my-8">{user && <CreateTeamForm userId={user?.id} />}</div>
    </div>
  );
};

export default Page;
