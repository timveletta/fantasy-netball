"use client";

import { useEffect } from "react";
import Text from "@/components/text";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container py-16 flex flex-col items-center text-center">
      <Text.Title>Something went wrong!</Text.Title>
      <Text.Subheader>
        FantasyNetball.com is still being developed so this might happen from time to time.
      </Text.Subheader>
      <Text.Body className="max-w-lg">
        Don't worry though, the developer has been notified and will look into it right after they find a fill in for
        their social netball team.
      </Text.Body>
      <div className="mt-4 space-x-2">
        <Button onClick={() => reset()}>Try again</Button>
        <Button asChild variant="outline">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
