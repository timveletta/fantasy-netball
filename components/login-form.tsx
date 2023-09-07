"use client";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";
import supabase from "@/lib/supabase";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().nonempty("Email is required").email("Email is invalid"),
  password: z.string().nonempty("Password is required"),
});

const LoginForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      form.setError("root", { message: error.message });
      return;
    }

    if (data) {
      router.push("/my-teams");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-sm w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
            </FormItem>
          )}
        />
        <FormMessage>{form.formState.errors?.root?.message}</FormMessage>
        <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
          Login
        </Button>
        <Link href="/forgot-password" className="block text-sm text-gray-800 hover:text-primary text-center">
          Forgot Password
        </Link>
        <Link href="/sign-up" className="block text-sm text-gray-800 hover:text-primary text-center">
          Don&apos;t have an account? Sign up
        </Link>
      </form>
    </Form>
  );
};

export default LoginForm;
