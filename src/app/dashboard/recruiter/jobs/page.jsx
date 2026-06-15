import { getCompanyJobs } from "@/lib/api/jobs";
import { Chip, Table, Button } from "@heroui/react";
import { Eye, Pencil, TrashBin } from "@gravity-ui/icons";
import React from "react";

const RecruiterJobs = async () => {
  const companyId = "comp_12345"; // TODO:Dynamic companyId,currently database static,letter it change
  const jobs = await getCompanyJobs(companyId); //data fetching is here by importing getCompanyJobs

  return (
    <div className="p-6 bg-[#09090b] min-h-screen text-zinc-100">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manage All Jobs</h2>
          <p className="text-sm text-zinc-400 mt-1">
            Monitor, edit, or remove your company's listed career opportunities.
          </p>
        </div>

        {/* HeroUI v3 table container */}
        <div className="border border-[#232326] bg-[#121214] rounded-2xl overflow-hidden shadow-xl p-2">
          <Table aria-label="Company Jobs Management Table">
            <Table.ResizableContainer>
              <Table.Content
                aria-label="Company Jobs Management Table"
                className="min-w-200"
              >
                {/* table header column */}
                <Table.Header>
                  <Table.Column
                    isRowHeader
                    defaultWidth="2fr"
                    id="title"
                    minWidth={200}
                  >
                    Job Title
                    <Table.ColumnResizer />
                  </Table.Column>
                  <Table.Column defaultWidth="1fr" id="type" minWidth={120}>
                    Type / Place
                    <Table.ColumnResizer />
                  </Table.Column>
                  <Table.Column defaultWidth="1.5fr" id="salary" minWidth={160}>
                    Salary Range
                    <Table.ColumnResizer />
                  </Table.Column>
                  <Table.Column defaultWidth="1fr" id="status" minWidth={100}>
                    Status
                    <Table.ColumnResizer />
                  </Table.Column>
                  <Table.Column
                    defaultWidth="1.2fr"
                    id="actions"
                    minWidth={150}
                  >
                    Actions
                  </Table.Column>
                </Table.Header>

                {/* table body data rendering */}
                <Table.Body emptyContent={"No jobs found for this company."}>
                  {jobs &&
                    jobs.map((job) => (
                      <Table.Row
                        key={job._id}
                        className="border-b border-[#232326]/50 hover:bg-[#1a1a1e]/50 transition-colors"
                      >
                        {/* ১. জব title এবং category */}
                        <Table.Cell>
                          <div className="flex flex-col">
                            <span className="font-semibold text-zinc-200 text-sm">
                              {job.title}
                            </span>
                            <span className="text-xs text-zinc-500">
                              {job.category}
                            </span>
                          </div>
                        </Table.Cell>

                        {/* ২. job ধরণ (Full-time/Part-time এবং Remote/Onsite) */}
                        <Table.Cell>
                          <div className="flex flex-col gap-1">
                            <span className="capitalize text-xs bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-md w-fit font-medium">
                              {job.type}
                            </span>
                            <span className="text-xs text-zinc-400">
                              {job.isRemote ? "Remote" : job.location}
                            </span>
                          </div>
                        </Table.Cell>

                        {/* ৩. salary range  */}
                        <Table.Cell>
                          <span className="text-sm font-medium text-emerald-400">
                            {job.minSalary?.toLocaleString()} -{" "}
                            {job.maxSalary?.toLocaleString()} {job.currency}
                          </span>
                        </Table.Cell>

                        {/* ৪. Status (Chip) */}
                        <Table.Cell>
                          <Chip
                            color={
                              job.status === "active" ? "success" : "danger"
                            }
                            size="sm"
                            variant="soft"
                            className="capitalize text-xs font-semibold"
                          >
                            {job.status}
                          </Chip>
                        </Table.Cell>

                        {/* ৫. action buttons */}
                        <Table.Cell>
                          <div className="flex items-center gap-2">
                            {/*  see details btn */}
                            <Button
                              isIconOnly
                              size="sm"
                              variant="flat"
                              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-[#232326] rounded-lg h-8 w-8"
                              title="View Details"
                            >
                              <Eye size={16} />
                            </Button>

                            {/* Edit btn */}
                            <Button
                              isIconOnly
                              size="sm"
                              variant="flat"
                              className="bg-zinc-800 hover:bg-violet-900/40 text-violet-400 border border-[#232326] rounded-lg h-8 w-8"
                              title="Edit Job"
                            >
                              <Pencil size={14} />
                            </Button>

                            {/* delete btn  */}
                            <Button
                              isIconOnly
                              size="sm"
                              variant="flat"
                              className="bg-zinc-800 hover:bg-danger/20 text-danger border border-[#232326] rounded-lg h-8 w-8"
                              title="Delete Job"
                            >
                              <TrashBin size={14} />
                            </Button>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                </Table.Body>
              </Table.Content>
            </Table.ResizableContainer>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RecruiterJobs;
