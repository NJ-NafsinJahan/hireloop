"use client";

import { useState } from "react";

const plans = [
  {
    name: "Starter",
    price: 0,
    desc: "Perfect for casual users",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1‑click apply, unlimited",
    ],
    highlight: false,
  },
  {
    name: "Growth",
    price: 17,
    desc: "Best for regular users",
    features: [
      "Unlimited bookings",
      "Advanced filters",
      "Priority booking access",
      "1‑click apply, unlimited",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    price: 99,
    desc: "For power users & admins",
    features: [
      "Everything in Pro",
      "Shared talent rooms",
      "Revenue insights dashboard",
      "Recruiter view (read-only)",
    ],
    highlight: false,
  },
];

export default function PricePackagePage() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="bg-black text-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <p className="text-fuchsia-500 uppercase text-sm tracking-widest">
          Pricing
        </p>

        <h2 className="text-3xl md:text-5xl font-bold mt-2">
          Pay for the leverage, not the listings
        </h2>

        {/* Toggle */}
        <div className="flex justify-center mt-6">
          <div className="bg-white/10 p-1 rounded-full flex items-center gap-2">
            <button
              onClick={() => setYearly(false)}
              className={`px-4 py-1 rounded-full text-sm ${
                !yearly ? "bg-white text-black" : "text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-4 py-1 rounded-full text-sm ${
                yearly ? "bg-fuchsia-500 text-white" : "text-white"
              }`}
            >
              Yearly <span className="text-xs">(25%)</span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border p-6 text-left transition hover:scale-[1.02] ${
                plan.highlight
                  ? "border-fuchsia-500 bg-white/5"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <h3 className="text-xl font-semibold flex items-center gap-2">
                {plan.name}
              </h3>

              <p className="text-sm text-gray-400 mt-1">{plan.desc}</p>

              <div className="mt-4 text-3xl font-bold">
                ${yearly ? plan.price * 10 : plan.price}
                <span className="text-sm text-gray-400">/month</span>
              </div>

              {/* Features */}
              <ul className="mt-4 space-y-2 text-sm text-gray-300">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-fuchsia-500">+</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button className="mt-6 w-full py-2 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
