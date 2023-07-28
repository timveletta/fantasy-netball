import "./globals.css";
import { Raleway } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { MainNav } from "@/components/main-nav";
import { cn } from "@/utils";
import PlausibleProvider from "next-plausible";
import Footer from "@/components/footer";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata = {
  title: "Fantasy Netball",
  description: "Created by Tim Veletta",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <PlausibleProvider domain="fantasynetball.com">
        <html lang="en">
          <body className={cn(raleway.className, "min-h-screen flex flex-col")}>
            <MainNav />
            <main className="mb-auto">{children}</main>
            <Footer />
          </body>
        </html>
      </PlausibleProvider>
    </ClerkProvider>
  );
}
