"use client";

import { signOut, useSession } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@heroui/react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Session data
  const { data: session, isPending } = useSession();
  // console.log("Session data from Navbar:", session, "is pending:", isPending);

  const user = session?.user;

  // handle SignOut
  const handleSignOut = async () => {
    await signOut();
  };

  const navLinks = [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Companies", href: "/companies" },
    { label: "For Recruiters", href: "/recruiters" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0F172A]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo (LEFT ONLY) */}
        <Link href="/" className="flex items-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            hire<span className="text-violet-500">loop</span>
          </h1>
        </Link>

        {/* RIGHT SIDE GROUP */}
        <div className="hidden items-center gap-8 lg:flex ml-auto">
          {/* Nav Links */}
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Divider (before Sign In) */}
          <div className="h-6 w-px bg-white/20" />

          {/* Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                Hi ! {user.name}
                <Button onClick={handleSignOut} variant="danger">
                  Sign Out
                </Button>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="rounded-xl px-4 py-2 text-sm font-medium text-slate-300 transition hover:text-white"
              >
                Sign In
              </Link>
            )}

            <Link
              href="/register"
              className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
          className="rounded-lg p-2 text-white lg:hidden"
        >
          {isMenuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6L18 18"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6H20M4 12H20M4 18H20"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          isMenuOpen ? "max-h-125" : "max-h-0"
        }`}
      >
        <div className="border-t border-white/10 bg-[#0F172A] px-4 py-5">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-slate-300 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="my-4 h-px bg-white/10" />

          <div className="flex flex-col gap-3">
            <Link
              href="/login"
              className="rounded-xl border border-white/10 px-4 py-3 text-center text-white"
            >
              Sign In
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-violet-600 px-4 py-3 text-center font-medium text-white hover:bg-violet-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
