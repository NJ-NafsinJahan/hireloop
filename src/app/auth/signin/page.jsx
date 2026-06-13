"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, Form, TextField, Label, Input, Button } from "@heroui/react";
// Assuming your better-auth client instance is exported here
import { authClient } from "@/lib/auth-client";

export default function SigninPage() {
  const router = useRouter();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Feedback UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const { data, error: authError } = await authClient.signIn.email({
        email,
        password,
        // Optional: Add a callbackURL or route manually upon promise resolve
      });

      if (authError) {
        setError(authError.message || "Invalid email or password.");
        return;
      }

      setSuccess("Successfully signed in! Redirecting...");
      setEmail("");
      setPassword("");

      // Redirect to dashboard, home page, or wherever your application lands
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      {/* HeroUI v3 Card component matched to your signup design */}
      <Card className="w-full max-w-md p-6 shadow-md border border-border">
        <div className="flex flex-col gap-1 mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your account
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
            <div className="flex justify-between items-center">
              <Label className="text-sm font-medium text-foreground">
                Password
              </Label>
              {/* Optional link placeholder for future password resets */}
              <Link
                href="/forgot-password"
                className="text-xs text-primary hover:underline"
              >
                Forgot?
              </Link>
            </div>
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
            className="w-full mt-2 py-2.5 bg-violet-600 rounded-xl text-sm font-medium shadow-sm transition-all text-white"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </Form>

        <div className="mt-6 flex justify-center border-t border-border pt-4 text-center">
          <p className="text-sm text-muted-foreground">
            New to HireLoop?{" "}
            <Link
              href="/auth/signup"
              className="text-primary hover:underline font-medium transition-all"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
