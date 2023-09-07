import Link, { LinkProps } from "next/link";

import { cn } from "@/utils";
import { Button } from "./ui/button";
import Image from "next/image";
import supabase from "@/lib/supabase";
import IsPreRelease from "./is-pre-release";

const NavLink = ({ className, ...props }: LinkProps & React.HTMLAttributes<HTMLElement>) => {
  return <Link className={cn("text-sm font-medium transition-colors hover:text-primary", className)} {...props}></Link>;
};

export async function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoggedIn = user!!;

  return (
    <nav className={cn("py-4", className)} {...props}>
      <div className="flex items-center justify-between container">
        <div>
          <Link href="/" className="text-primary">
            <Image src="/logo.png" width={64} height={64} alt="Logo" />
          </Link>
        </div>
        <IsPreRelease>
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
            {/* <UserButton afterSignOutUrl="/" /> */}
          </div>
        </IsPreRelease>
      </div>
    </nav>
  );
}
