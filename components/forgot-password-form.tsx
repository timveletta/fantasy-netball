"use client";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";
import supabase from "@/lib/supabase";
import React from "react";
import Text from "@/components/text";

const formSchema = z.object({
  email: z.string().nonempty("Email is required").email("Email is invalid"),
});

const ForgotPasswordForm = () => {
  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    if (error) {
      form.setError("root", { message: error.message });
      return;
    }

    if (data) {
      setHasSubmitted(true);
    }
  }

  if (hasSubmitted) {
    return (
      <div className="container py-16 flex flex-col items-center text-center">
        <Text.Title>Check your email!</Text.Title>
        <Text.Subheader>
          We&apos;ve sent a password reset email to your email address. Please click the link in the email to reset your
          password.
        </Text.Subheader>
        <div className="mt-4 space-x-2">
          <Button asChild variant="outline">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
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
        <FormMessage>{form.formState.errors?.root?.message}</FormMessage>
        <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
          Send Reset Email
        </Button>
        <Link href="/sign-up" className="block text-sm text-gray-800 hover:text-primary text-center">
          Don&apos;t have an account? Sign up
        </Link>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
