"use client";

import Image from "next/image";
import { Card } from "@heroui/react";

// Gravity UI Icons
// import { Briefcase, ChartColumn, Users, Star } from "@gravity-ui/icons-react";
// import { Briefcase, ChartColumn, Users, Star } from "@gravity-ui/icons-react";
import { FaBriefcase, FaChartBar, FaUsers, FaStar } from "react-icons/fa";

const stats = [
  {
    icon: FaBriefcase,
    value: "50K",
    label: "Active Jobs",
  },
  {
    icon: FaChartBar,
    value: "12K",
    label: "Companies",
  },
  {
    icon: FaUsers,
    value: "2M",
    label: "Job Seekers",
  },
  {
    icon: FaStar,
    value: "97%",
    label: "Satisfaction Rate",
  },
];

export default function StatsSection() {
  return (
    <section className="relative pt-18 min-h-163 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/globe.png"
        alt="Global hiring platform"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Glow Effect */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-violet-600/30 blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-xl md:text-4xl font-bold text-white">
            Assisting over 15,000 job seekers
          </h2>

          <p className="mt-4 text-gray-300 text-xl">
            Find your dream positions.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <Card
                key={index}
                variant="transparent"
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl min-h-20  items-baseline"
              >
                <Card.Content className="p-8 items-baseline">
                  <Icon className="text-white mb-8" width={30} height={35} />

                  <h3 className="text-4xl font-bold text-white">
                    {item.value}
                  </h3>

                  <p className="mt-2 text-sm text-gray-400">{item.label}</p>
                </Card.Content>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
