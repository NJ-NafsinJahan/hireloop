"use server";

import { serverMutation } from "../core/server";

export const createCompany = async (newCompanyData) => {
  return serverMutation("/api/companies", newCompanyData); //serverMutation k call kora
};

// const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

// export const createCompany = async (newCompanyData) => {
//   const res = await fetch(`${baseURL}/api/companies`, {
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
//     },
//     body: JSON.stringify(newCompanyData),
//   });
//   return res.json();
// };
