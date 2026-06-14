"use client";

import { Card } from "@heroui/react";

export default function StatCard({ title, value, icon: Icon }) {
  return (
    <Card className="w-full bg-[#121212] border border-[#232323] p-6 rounded-2xl shadow-sm flex flex-col gap-4 select-none">
      {/* icons */}
      {Icon && (
        <div className="w-10 h-10 rounded-xl bg-[#1e1e1e] border border-[#2e2e2e] flex items-center justify-center text-zinc-400">
          <Icon size={18} />
        </div>
      )}

      {/* text and value section */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-zinc-500 tracking-wide uppercase">
          {title}
        </span>
        <span className="text-2xl font-bold text-zinc-100 tracking-tight">
          {value}
        </span>
      </div>
    </Card>
  );
}
