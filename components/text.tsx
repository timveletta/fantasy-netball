import { cn } from "@/utils";

const Text = {
  Title: ({ children, className }: React.HTMLAttributes<HTMLElement>) => (
    <h1 className={cn("scroll-m-20 text-4xl font-black tracking-tight lg:text-5xl/snug leading-snug", className)}>
      {children}
    </h1>
  ),
  Header: ({ children, className }: React.HTMLAttributes<HTMLElement>) => (
    <h2 className={cn("text-2xl font-bold", className)}>{children}</h2>
  ),
  Subheader: ({ children, className }: React.HTMLAttributes<HTMLElement>) => (
    <h3 className={cn("md:text-lg font-bold", className)}>{children}</h3>
  ),
  Body: ({ children, className }: React.HTMLAttributes<HTMLElement>) => (
    <p className={cn("mb-2", className)}>{children}</p>
  ),
  Label: ({ children, className }: React.HTMLAttributes<HTMLElement>) => (
    <label className={cn("uppercase text-xs opacity-80 font-bold", className)}>{children}</label>
  ),
};

export default Text;
