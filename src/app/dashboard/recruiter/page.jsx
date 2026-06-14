"use client";
import RecruiterDashboardStats from "@/components/dashboard/RecruiterDashboardStats";
import { useSession } from "@/lib/auth-client";

import React from "react";

const RecruiterDashboardHomePage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div className="text-violet-600">Data Loading.....</div>;
  }

  const user = session?.user;
  console.log("user from RecruiterDashboardPage", user);

  //   recruiter stats
  const recruiterStats = [
    { id: 1, title: "Total Job Posts", value: "48", icon: Document },
    { id: 2, title: "Total Applicants", value: "1,284", icon: Persons },
    { id: 3, title: "Active Jobs", value: "18", icon: Flash },
    { id: 4, title: "Jobs Closed", value: "32", icon: CircleCheck },
  ];
  return (
    <div>
      <h2 className="text-2xl font-bold">
        Welcome Back!
        <span className="text-violet-600 text-3xl"> {user?.name}</span>{" "}
      </h2>

      {/* recruiter dashboard stats */}
      <RecruiterDashboardStats></RecruiterDashboardStats>
    </div>
  );
};

export default RecruiterDashboardHomePage;
