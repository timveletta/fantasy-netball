"use client";

import { useEffect } from "react";
import Text from "@/components/text";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VerifyEmail() {
  return (
    <div className="container py-16 flex flex-col items-center text-center">
      <Text.Title>Verify your email address!</Text.Title>
      <Text.Subheader>
        We&apos;ve sent an email to your email address. Please click the link in the email to verify your account.
      </Text.Subheader>
      <div className="mt-4 space-x-2">
        <Button asChild variant="outline">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
