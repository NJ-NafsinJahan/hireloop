"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  Fieldset,
  TextField,
  Label,
  Input,
  Select,
  ListBox,
  Button,
  FieldError,
  Switch,
  toast,
} from "@heroui/react";
import {
  ArrowLeft,
  Globe,
  FileDollar,
  Calendar,
  Briefcase,
} from "@gravity-ui/icons";
import { createJob } from "@/lib/actions/jobs";
// import { Toast, toast } from "@heroui/react";

export default function PostJobPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [companyInfo, setCompanyInfo] = useState({
    id: "",
    name: "",
    isApproved: false,
  });
  const [isRemote, setIsRemote] = useState(false);

  useEffect(() => {
    setCompanyInfo({
      id: "comp_12345",
      name: "Acme Corporation",
      isApproved: true,
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!companyInfo.isApproved) {
      setError("Your company is not approved yet. You cannot post a job.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);
    const jobData = {
      title: formData.get("jobTitle"),
      category: formData.get("jobCategory"),
      type: formData.get("jobType"),
      minSalary: Number(formData.get("minSalary")),
      maxSalary: Number(formData.get("maxSalary")),
      currency: formData.get("currency"),
      isRemote: isRemote,
      location: isRemote ? "Remote" : formData.get("location"),
      deadline: formData.get("deadline"),
      responsibilities: formData.get("responsibilities"),
      requirements: formData.get("requirements"),
      benefits: formData.get("benefits"),
      companyId: companyInfo.id,
      status: "active",
    };

    try {
      setIsLoading(true);
      setError("");
      setSuccess("");

      // get API call
      const res = await createJob(jobData);

      console.log("Submitting Job Data:", jobData);

      if (res.insertedId) {
        toast.success("Job Posted Successfully");
      }
      setSuccess("Job posted successfully! Making it publicly visible...");
      //   toast.success("Job posted successfully!");
      setTimeout(() => {
        router.push("/dashboard/recruiter/jobs");
      }, 2000);
    } catch (err) {
      setError("Failed to post the job. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-4 sm:p-8 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-[#121214] border border-[#232326] rounded-2xl p-6 sm:p-8 shadow-xl">
        {/* Header Section */}
        <div className="flex justify-between items-start border-b border-[#232326] pb-6 mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Create New Job Post
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Enter the job specifications to start receiving applications.
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            className="border border-[#232326] text-zinc-400 hover:bg-[#1e1e21] min-w-10 h-10 p-0"
            onClick={() => router.back()}
          >
            <ArrowLeft size={16} />
          </Button>
        </div>

        {/* Error and success message */}
        <div className="flex flex-col gap-3 mb-6">
          {error && (
            <div className="p-4 text-sm rounded-xl bg-danger/10 border border-danger/20 text-danger font-medium">
              {error}
            </div>
          )}
          {success && (
            <div className="p-4 text-sm rounded-xl bg-success/10 border border-success/20 text-success font-medium">
              {success}
            </div>
          )}
        </div>

        {/* Form */}
        <Form
          onSubmit={handleSubmit}
          validationBehavior="native"
          className="flex flex-col gap-8"
        >
          {/* SECTION 1: Job Info */}
          <Fieldset className="flex flex-col gap-5 border border-[#232326] p-5 rounded-xl bg-[#161619]/50">
            <legend className="text-md font-semibold text-violet-400 px-2 flex items-center gap-2">
              <Briefcase size={16} /> Job Information
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                isRequired
                name="jobTitle"
                className="w-full flex flex-col gap-1.5"
              >
                <Label className="text-sm font-medium text-zinc-300">
                  Job Title
                </Label>
                <Input
                  placeholder="e.g. Senior Software Engineer"
                  className="bg-[#1e1e21] border-[#232326] rounded-xl text-sm"
                />
                <FieldError className="text-xs text-danger" />
              </TextField>

              <TextField
                isRequired
                name="jobCategory"
                className="w-full flex flex-col gap-1.5"
              >
                <Label className="text-sm font-medium text-zinc-300">
                  Job Category
                </Label>
                <Input
                  placeholder="e.g. Technology / Engineering"
                  className="bg-[#1e1e21] border-[#232326] rounded-xl text-sm"
                />
                <FieldError className="text-xs text-danger" />
              </TextField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* job type */}
              <Select
                name="jobType"
                className="w-full flex flex-col gap-1.5"
                placeholder="Select job type"
              >
                <Label className="text-sm font-medium text-zinc-300">
                  Job Type
                </Label>
                <Select.Trigger className="bg-[#1e1e21] border border-[#232326] rounded-xl text-sm p-3 flex justify-between items-center text-zinc-300">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox className="bg-[#121214] border border-[#232326] rounded-xl p-1 text-zinc-200">
                    <ListBox.Item
                      id="full-time"
                      textValue="Full-time"
                      className="p-2 hover:bg-[#1e1e21] rounded-lg cursor-pointer"
                    >
                      Full-time
                    </ListBox.Item>
                    <ListBox.Item
                      id="part-time"
                      textValue="Part-time"
                      className="p-2 hover:bg-[#1e1e21] rounded-lg cursor-pointer"
                    >
                      Part-time
                    </ListBox.Item>
                    <ListBox.Item
                      id="contract"
                      textValue="Contract"
                      className="p-2 hover:bg-[#1e1e21] rounded-lg cursor-pointer"
                    >
                      Contract
                    </ListBox.Item>
                    <ListBox.Item
                      id="internship"
                      textValue="Internship"
                      className="p-2 hover:bg-[#1e1e21] rounded-lg cursor-pointer"
                    >
                      Internship
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>

              <TextField
                isRequired
                name="deadline"
                type="date"
                className="w-full flex flex-col gap-1.5"
              >
                <Label className="text-sm font-medium text-zinc-300 flex items-center gap-1">
                  <Calendar size={14} /> Application Deadline
                </Label>
                <Input className="bg-[#1e1e21] border-[#232326] rounded-xl text-sm" />
                <FieldError className="text-xs text-danger" />
              </TextField>
            </div>

            {/* Salary range */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#232326]/60 pt-4">
              <TextField
                isRequired
                name="minSalary"
                type="number"
                className="w-full flex flex-col gap-1.5"
              >
                <Label className="text-sm font-medium text-zinc-300 flex items-center gap-1">
                  <FileDollar size={14} /> Min Salary
                </Label>
                <Input
                  placeholder="e.g. 50000"
                  className="bg-[#1e1e21] border-[#232326] rounded-xl text-sm"
                />
                <FieldError className="text-xs text-danger" />
              </TextField>

              <TextField
                isRequired
                name="maxSalary"
                type="number"
                className="w-full flex flex-col gap-1.5"
              >
                <Label className="text-sm font-medium text-zinc-300 flex items-center gap-1">
                  <FileDollar size={14} /> Max Salary
                </Label>
                <Input
                  placeholder="e.g. 80000"
                  className="bg-[#1e1e21] border-[#232326] rounded-xl text-sm"
                />
                <FieldError className="text-xs text-danger" />
              </TextField>

              <Select
                name="currency"
                className="w-full flex flex-col gap-1.5"
                placeholder="Currency"
              >
                <Label className="text-sm font-medium text-zinc-300">
                  Currency
                </Label>
                <Select.Trigger className="bg-[#1e1e21] border border-[#232326] rounded-xl text-sm p-3 flex justify-between items-center text-zinc-300">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox className="bg-[#121214] border border-[#232326] rounded-xl p-1 text-zinc-200">
                    <ListBox.Item
                      id="USD"
                      textValue="USD"
                      className="p-2 hover:bg-[#1e1e21] rounded-lg cursor-pointer"
                    >
                      USD ($)
                    </ListBox.Item>
                    <ListBox.Item
                      id="BDT"
                      textValue="BDT"
                      className="p-2 hover:bg-[#1e1e21] rounded-lg cursor-pointer"
                    >
                      BDT (৳)
                    </ListBox.Item>
                    <ListBox.Item
                      id="EUR"
                      textValue="EUR"
                      className="p-2 hover:bg-[#1e1e21] rounded-lg cursor-pointer"
                    >
                      EUR (€)
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* location section*/}
            <div className="flex flex-col gap-3 border-t border-[#232326]/60 pt-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-zinc-300 flex items-center gap-1.5">
                  <Globe size={14} /> Remote Position
                </div>

                <Switch
                  isSelected={isRemote}
                  onChange={setIsRemote}
                  className="inline-flex items-center"
                >
                  <Switch.Control className="w-9 h-5 bg-zinc-700 data-[selected=true]:bg-violet-600 rounded-full p-0.5 transition-colors duration-200 cursor-pointer flex items-center">
                    <Switch.Thumb className="w-4 h-4 bg-white rounded-full shadow-md transform data-[selected=true]:translate-x-4 transition-transform duration-200" />
                  </Switch.Control>
                </Switch>
              </div>

              {!isRemote && (
                <TextField
                  isRequired={!isRemote}
                  name="location"
                  className="w-full flex flex-col gap-1.5"
                >
                  <Label className="text-sm font-medium text-zinc-400">
                    Location (City, Country)
                  </Label>
                  <Input
                    placeholder="e.g. Dhaka, Bangladesh"
                    className="bg-[#1e1e21] border-[#232326] rounded-xl text-sm"
                  />
                  <FieldError className="text-xs text-danger" />
                </TextField>
              )}
            </div>
          </Fieldset>

          {/* SECTION 2: Job Description */}
          <Fieldset className="flex flex-col gap-5 border border-[#232326] p-5 rounded-xl bg-[#161619]/50">
            <legend className="text-md font-semibold text-violet-400 px-2">
              Job Description
            </legend>

            <TextField
              isRequired
              name="responsibilities"
              className="w-full flex flex-col gap-1.5"
            >
              <Label className="text-sm font-medium text-zinc-300">
                Key Responsibilities
              </Label>
              <Input
                as="textarea"
                rows={4}
                placeholder="Tell us about the day-to-day responsibilities for this role..."
                className="bg-[#1e1e21] border-[#232326] rounded-xl text-sm p-3 h-auto min-h-25"
              />
              <FieldError className="text-xs text-danger" />
            </TextField>

            <TextField
              isRequired
              name="requirements"
              className="w-full flex flex-col gap-1.5"
            >
              <Label className="text-sm font-medium text-zinc-300">
                Requirements & Qualifications
              </Label>
              <Input
                as="textarea"
                rows={4}
                placeholder="What skills, experience, or degrees are required?"
                className="bg-[#1e1e21] border-[#232326] rounded-xl text-sm p-3 h-auto min-h-25"
              />
              <FieldError className="text-xs text-danger" />
            </TextField>

            <TextField name="benefits" className="w-full flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-zinc-300">
                Benefits & Perks (Optional)
              </Label>
              <Input
                as="textarea"
                rows={3}
                placeholder="Medical, Remote work setup allowance, Performance bonus, etc."
                className="bg-[#1e1e21] border-[#232326] rounded-xl text-sm p-3 h-auto min-h-20"
              />
            </TextField>
          </Fieldset>

          {/* SECTION 3: Company */}
          <div className="p-4 rounded-xl border border-[#232326] bg-[#1a1a1e] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <span className="text-xs uppercase tracking-wider text-zinc-500 font-bold block">
                Posting Company
              </span>
              <span className="text-lg font-semibold text-zinc-200">
                {companyInfo.name || "Loading Company..."}
              </span>
            </div>
            <div>
              {companyInfo.isApproved ? (
                <span className="text-xs bg-success/10 text-success border border-success/20 px-3 py-1 rounded-full font-medium">
                  Approved Organization
                </span>
              ) : (
                <span className="text-xs bg-danger/10 text-danger border border-danger/20 px-3 py-1 rounded-full font-medium">
                  Pending Approval
                </span>
              )}
            </div>
          </div>

          {/* action buttons */}
          <div className="flex justify-end gap-3 border-t border-[#232326] pt-6">
            <Button
              type="button"
              variant="flat"
              className="rounded-xl px-5 text-zinc-400 border border-[#232326] bg-transparent hover:bg-[#1e1e21]"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl px-6 shadow-md transition-all"
              isLoading={isLoading}
              disabled={!companyInfo.isApproved}
            >
              Post Job
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
