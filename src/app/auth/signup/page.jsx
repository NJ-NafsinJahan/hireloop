"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, Form, TextField, Label, Input, Button } from "@heroui/react";
// Assuming your better-auth client instance is exported here
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const router = useRouter();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Feedback UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    // HeroUI v3 handles native validation if configured,
    // but prevent default to route through JavaScript for AJAX submission
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const { data, error: authError } = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (authError) {
        setError(authError.message || "Something went wrong during signup.");
        return;
      }

      setSuccess("Account created successfully! Redirecting...");
      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        router.push("/auth/signin");
      }, 2000);
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      {/* HeroUI v3 Card component */}
      <Card className="w-full max-w-md p-6 shadow-md border border-border">
        <div className="flex flex-col gap-1 mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials below to get started
          </p>
        </div>

        {/* Native styling status flags */}
        <div className="flex flex-col gap-3 mb-4">
          {error && (
            <div className="p-3 text-sm rounded-xl bg-danger/10 border border-danger/20 text-danger font-medium animate-in fade-in">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 text-sm rounded-xl bg-success/10 border border-success/20 text-success font-medium animate-in fade-in">
              {success}
            </div>
          )}
        </div>

        {/* HeroUI v3 Form handler */}
        <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField isRequired className="w-full flex flex-col gap-1.5">
            <Label className="text-sm font-medium text-foreground"> Name</Label>
            <Input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm shadow-sm focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
            />
          </TextField>

          <TextField isRequired className="w-full flex flex-col gap-1.5">
            <Label className="text-sm font-medium text-foreground">Email</Label>
            <Input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm shadow-sm focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
            />
          </TextField>

          <TextField isRequired className="w-full flex flex-col gap-1.5">
            <Label className="text-sm font-medium text-foreground">
              Password
            </Label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm shadow-sm focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
            />
          </TextField>

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-2 py-2.5 bg-violet-600 rounded-xl text-sm font-medium shadow-sm transition-all"
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </Button>
        </Form>

        <div className="mt-6 flex justify-center border-t border-border pt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="text-primary hover:underline font-medium transition-all"
            >
              Sign In
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
