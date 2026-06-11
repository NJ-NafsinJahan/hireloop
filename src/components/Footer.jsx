"use client";

import Link from "next/link";
import { Person, Envelope, Globe } from "@gravity-ui/icons";

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/10 text-slate-400">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Left Section */}
          <div className="lg:col-span-2">
            <Link href="/">
              <h2 className="text-3xl font-bold text-white">
                hire<span className="text-violet-500">loop</span>
              </h2>
            </Link>

            <p className="mt-6 max-w-sm leading-7">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>

            {/* Social / Contact Icons */}
            <div className="flex items-center gap-3 mt-8">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 hover:bg-violet-600 hover:text-white transition"
              >
                <Person className="w-5 h-5" />
              </Link>

              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 hover:bg-violet-600 hover:text-white transition"
              >
                <Envelope className="w-5 h-5" />
              </Link>

              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 hover:bg-violet-600 hover:text-white transition"
              >
                <Globe className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-5">Product</h3>

            <ul className="space-y-3">
              <li>
                <Link href="/jobs" className="hover:text-white transition">
                  Job Discovery
                </Link>
              </li>

              <li>
                <Link href="/worker-ai" className="hover:text-white transition">
                  Worker AI
                </Link>
              </li>

              <li>
                <Link href="/companies" className="hover:text-white transition">
                  Companies
                </Link>
              </li>

              <li>
                <Link href="/salary" className="hover:text-white transition">
                  Salary Data
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-5">Navigation</h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/help-center"
                  className="hover:text-white transition"
                >
                  Help Center
                </Link>
              </li>

              <li>
                <Link
                  href="/career-library"
                  className="hover:text-white transition"
                >
                  Career Library
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-5">Resources</h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/brand-guideline"
                  className="hover:text-white transition"
                >
                  Brand Guideline
                </Link>
              </li>

              <li>
                <Link href="/newsroom" className="hover:text-white transition">
                  Newsroom
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">© 2026 HireLoop. All rights reserved.</p>

          <div className="flex items-center gap-6 text-sm">
            <Link href="/terms" className="hover:text-white transition">
              Terms & Conditions
            </Link>

            <Link href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
