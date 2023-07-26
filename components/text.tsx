import { cn } from "@/utils";

const Text = {
  Title: ({ children, className }: React.HTMLAttributes<HTMLElement>) => (
    <h1 className={cn(className, "scroll-m-20 text-4xl font-black tracking-tight lg:text-5xl/snug leading-snug")}>
      {children}
    </h1>
  ),
  Header: ({ children, className }: React.HTMLAttributes<HTMLElement>) => (
    <h2 className={cn(className, "text-2xl font-bold mt-4 mb-2")}>{children}</h2>
  ),
  Subheader: ({ children, className }: React.HTMLAttributes<HTMLElement>) => (
    <h3 className={cn(className, "text-lg font-bold mt-4 mb-2")}>{children}</h3>
  ),
  Body: ({ children, className }: React.HTMLAttributes<HTMLElement>) => (
    <p className={cn(className, "mb-2")}>{children}</p>
  ),
};

export default Text;
