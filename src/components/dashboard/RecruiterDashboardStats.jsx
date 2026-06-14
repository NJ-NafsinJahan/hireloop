"use client";

// import StatCard from "@/components/StatCard";

import { Files, Persons, Thunderbolt, CircleCheck } from "@gravity-ui/icons";
import StatCard from "./StatCard";

export default function RecruiterDashboardStats() {
  //  recruiter data
  const statsData = [
    { id: 1, title: "Total Job Posts", value: "48", icon: Files },
    { id: 2, title: "Total Applicants", value: "1,284", icon: Persons },
    { id: 3, title: "Active Jobs", value: "18", icon: Thunderbolt },
    { id: 4, title: "Jobs Closed", value: "32", icon: CircleCheck },
  ];

  return (
    <div className="min-h-screen bg-black p-8 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl font-bold mb-6 text-zinc-200">
          Dashboard Overview
        </h1>

        {/* 4 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat) => (
            <StatCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
