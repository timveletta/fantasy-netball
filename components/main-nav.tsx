import Link, { LinkProps } from "next/link";

import { cn } from "@/utils";
import { UserButton, auth } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Image from "next/image";

const NavLink = ({ className, ...props }: LinkProps & React.HTMLAttributes<HTMLElement>) => {
  return <Link className={cn("text-sm font-medium transition-colors hover:text-primary", className)} {...props}></Link>;
};

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const { userId } = auth();

  const isLoggedIn = !!userId;

  return (
    <nav className={cn("py-4", className)} {...props}>
      <div className="flex items-center justify-between container">
        <div>
          <Link href="/" className="text-primary">
            <Image src="/logo.png" width={64} height={64} alt="Logo" />
          </Link>
        </div>
        <div className="flex space-x-4 items-center">
          {isLoggedIn && <NavLink href="/my-teams">My Teams</NavLink>}
          {!isLoggedIn && (
            <>
              <Button asChild variant="outline">
                <Link href="/sign-in">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">Register</Link>
              </Button>
            </>
          )}
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
}
