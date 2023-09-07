import CreateTeamForm from "@/components/create-team-form";
import Text from "@/components/text";
import { getUserByClerkId } from "@/lib/actions";
import React from "react";

const Page = async () => {
  const user = false; // await getUserByClerkId(clerkId!);

  return (
    <div className="container py-8">
      <Text.Title>Create Team</Text.Title>
      <div className="max-w-lg my-8">{user && <CreateTeamForm userId={user} />}</div>
    </div>
  );
};

export default Page;
