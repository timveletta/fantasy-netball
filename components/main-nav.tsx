import Link, { LinkProps } from "next/link";

import { cn } from "@/utils";
import { UserButton, auth } from "@clerk/nextjs";

const NavLink = ({ className, ...props }: LinkProps & React.HTMLAttributes<HTMLElement>) => {
  return <Link className={cn("text-sm font-medium transition-colors hover:text-primary", className)} {...props}></Link>;
};

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const { userId } = auth();

  const isLoggedIn = !!userId;

  return (
    <nav className={cn("py-4 border-b border-gray-300", className)} {...props}>
      <div className="flex  justify-between container">
        <div>
          <Link href="/" className="text-primary">
            Fantasy Netball
          </Link>
        </div>
        <div className="flex space-x-4 lg:space-x-6">
          {isLoggedIn && <NavLink href="/my-teams">My Teams</NavLink>}
          {!isLoggedIn && (
            <>
              <NavLink href="/sign-in">Login</NavLink>
              <NavLink href="/sign-up">Register</NavLink>
            </>
          )}
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
}
