"use client";

import React, { useState } from "react";
// Gravity UI Icons implementation
import {
  Cubes3Overlap, // Industry / Category alternate
  Globe, // Website URL
  Persons, // Employee count scale
  Pin, // Location indicator
  ArrowUpFromLine, // Upload logo icon
  Pencil, // Edit profile action
  CircleCheck, // Approved badge icon
  CircleExclamation, // Pending badge icon
  CircleXmark, // Rejected badge icon
  ArrowLeft, // Back navigation control
} from "@gravity-ui/icons";

// --- HERO UI MOCK STUBS FOR NATIVE FORM BEHAVIOR ---
import {
  Form,
  Fieldset,
  TextField,
  Label,
  Input,
  FieldError,
  Select,
  ListBox,
  Button,
} from "@heroui/react";

export default function CompanyDashboard() {
  // State to simulate database record state: 'not_registered', 'viewing', 'editing'
  const [viewState, setViewState] = useState("not_registered");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Core company data structure
  const [companyData, setCompanyData] = useState({
    name: "",
    industry: "",
    websiteUrl: "",
    location: "",
    employeeCount: "",
    logoUrl: "",
    description: "",
    status: "Pending", // Pending | Approved | Rejected
  });

  // Temporary local state for form mutation
  const [formValues, setFormValues] = useState({ ...companyData });

  // Handle image upload to ImgBB
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const apiKey =
        process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API || "YOUR_IMGBB_API_KEY";
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await response.json();

      if (data.success) {
        setFormValues((prev) => ({ ...prev, logoUrl: data.data.url }));
      } else {
        alert("ImgBB upload failed.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log("Submitted Company Data:", formValues);

    // Simulate API Network latency
    setTimeout(() => {
      setCompanyData({ ...formValues });
      setViewState("viewing");
      setIsSubmitting(false);
    }, 1200);

    // console.log("Company profile data:", companyData);
  };

  // Status Badge UI Renderer using Gravity Icons
  const renderStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return (
          <span className="inline-flex items-center gap-1.5 text-xs bg-success/10 text-emerald-400 border border-success/20 px-3 py-1 rounded-full font-medium">
            <CircleCheck size={14} /> Approved Organization
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center gap-1.5 text-xs bg-danger/10 text-rose-400 border border-danger/20 px-3 py-1 rounded-full font-medium">
            <CircleXmark size={14} /> Registration Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs bg-warning/10 text-amber-400 border border-warning/20 px-3 py-1 rounded-full font-medium">
            <CircleExclamation size={14} /> Pending Admin Approval
          </span>
        );
    }
  };

  // ---------------------------------------------------------
  // VIEW 1: Empty Slate (No Company Registered)
  // ---------------------------------------------------------
  if (viewState === "not_registered") {
    return (
      <div className="max-w-4xl mx-auto my-12 p-8 border border-[#232326] bg-[#161619]/50 rounded-2xl flex flex-col items-center justify-center text-center gap-6">
        <div className="p-4 bg-[#1e1e21] border border-[#232326] rounded-full text-zinc-400">
          <Cubes3Overlap size={40} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-zinc-100">
            No Company Profile Setup
          </h2>
          <p className="text-sm text-zinc-400 max-w-md mx-auto">
            To post jobs and access workspace settings, register your
            organization details first.
          </p>
        </div>
        <Button
          type="button"
          onClick={() => {
            setFormValues({ ...companyData });
            setViewState("registering");
          }}
          className="bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl px-6 py-2.5 shadow-md transition-all text-sm mt-2"
        >
          Register Company
        </Button>
      </div>
    );
  }

  // ---------------------------------------------------------
  // VIEW 2: Registered Dashboard Overview View
  // ---------------------------------------------------------
  if (viewState === "viewing") {
    return (
      <div className="max-w-4xl mx-auto my-8 space-y-6">
        {/* Profile Card Header */}
        <div className="p-6 rounded-xl border border-[#232326] bg-[#161619]/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            {companyData.logoUrl ? (
              <img
                src={companyData.logoUrl}
                alt={`${companyData.name} Logo`}
                className="w-16 h-16 object-cover rounded-xl border border-[#232326]"
              />
            ) : (
              <div className="w-16 h-16 bg-[#1e1e21] border border-[#232326] rounded-xl flex items-center justify-center text-zinc-500">
                <Cubes3Overlap size={24} />
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-zinc-100">
                {companyData.name}
              </h2>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-400 mt-1">
                <span className="flex items-center gap-1">
                  <Cubes3Overlap size={14} /> {companyData.industry}
                </span>
                <span className="flex items-center gap-1">
                  <Pin size={14} /> {companyData.location}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {renderStatusBadge(companyData.status)}
            <Button
              onClick={() => {
                setFormValues({ ...companyData });
                setViewState("editing");
              }}
              className="rounded-xl px-4 py-2 text-zinc-300 border border-[#232326] bg-[#1e1e21] hover:bg-[#27272a] text-sm flex items-center gap-2"
            >
              <Pencil size={14} /> Edit
            </Button>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 p-6 rounded-xl border border-[#232326] bg-[#161619]/50 space-y-4">
            <h3 className="text-md font-semibold text-zinc-300">
              About Organization
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-wrap">
              {companyData.description || "No description provided."}
            </p>
          </div>

          <div className="p-6 rounded-xl border border-[#232326] bg-[#161619]/50 space-y-4">
            <h3 className="text-md font-semibold text-zinc-300">
              Quick Details
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-xs uppercase tracking-wider text-zinc-500 block">
                  Website Link
                </span>
                <a
                  href={companyData.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-violet-400 hover:underline flex items-center gap-1 mt-0.5"
                >
                  <Globe size={14} /> Visit Platform
                </a>
              </div>
              <hr className="border-[#232326]" />
              <div>
                <span className="text-xs uppercase tracking-wider text-zinc-500 block">
                  Company Size
                </span>
                <span className="text-sm text-zinc-300 flex items-center gap-1 mt-0.5">
                  <Persons size={14} /> {companyData.employeeCount} Employees
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------
  // VIEW 3: Register / Edit Profile View
  // ---------------------------------------------------------
  return (
    <div className="max-w-4xl mx-auto my-8">
      <div className="mb-6 flex items-center gap-3">
        <button
          type="button"
          onClick={() =>
            setViewState(companyData.name ? "viewing" : "not_registered")
          }
          className="p-2 hover:bg-[#1e1e21] rounded-lg transition-colors text-zinc-400 hover:text-zinc-200"
        >
          <ArrowLeft size={16} />
        </button>
        <h2 className="text-xl font-bold text-zinc-100">
          {viewState === "editing"
            ? "Edit Company Profile"
            : "Register Company"}
        </h2>
      </div>

      <Form
        onSubmit={handleSubmit}
        validationBehavior="native"
        className="flex flex-col gap-8"
      >
        <Fieldset className="flex flex-col gap-6 border border-[#232326] p-6 rounded-xl bg-[#161619]/50">
          {/* Row 1: Company Name & Industry Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <TextField
              isRequired
              name="companyName"
              className="w-full flex flex-col gap-1.5"
            >
              <Label className="text-sm font-medium text-zinc-300">
                Company Name
              </Label>
              <Input
                placeholder="e.g. Acme Corp"
                value={formValues.name}
                onChange={(e) =>
                  setFormValues((prev) => ({ ...prev, name: e.target.value }))
                }
                className="bg-[#1e1e21] border-[#232326] rounded-xl text-sm"
              />
              <FieldError className="text-xs text-danger" />
            </TextField>

            <Select
              name="industry"
              className="w-full flex flex-col gap-1.5"
              placeholder="Select Industry"
              selectedKey={formValues.industry}
              onSelectionChange={(key) =>
                setFormValues((prev) => ({ ...prev, industry: key }))
              }
            >
              <Label className="text-sm font-medium text-zinc-300">
                Industry / Category
              </Label>
              <Select.Trigger className="bg-[#1e1e21] border border-[#232326] rounded-xl text-sm p-3 flex justify-between items-center text-zinc-300">
                <Select.Value>
                  {formValues.industry || "Technology"}
                </Select.Value>
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox className="bg-[#121214] border border-[#232326] rounded-xl p-1 text-zinc-200 w-full">
                  {[
                    "Technology",
                    "Design & Creative",
                    "Healthcare",
                    "Finance",
                    "Education",
                  ].map((ind) => (
                    <ListBox.Item
                      key={ind}
                      id={ind}
                      textValue={ind}
                      className="p-2 hover:bg-[#1e1e21] rounded-lg cursor-pointer"
                    >
                      {ind}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* Row 2: Website URL & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <TextField
              isRequired
              name="websiteUrl"
              type="url"
              className="w-full flex flex-col gap-1.5"
            >
              <Label className="text-sm font-medium text-zinc-300">
                Website URL
              </Label>
              <div className="flex rounded-xl overflow-hidden border border-[#232326] bg-[#1e1e21]">
                <span className="bg-[#18181b] px-3 py-2 text-zinc-500 text-sm flex items-center border-r border-[#232326]">
                  https://
                </span>
                <Input
                  placeholder="www.company.com"
                  value={formValues.websiteUrl.replace(/^https?:\/\//, "")}
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      websiteUrl: `https://${e.target.value}`,
                    }))
                  }
                  className="bg-transparent border-0 rounded-none w-full focus:ring-0 text-sm px-3"
                />
              </div>
              <FieldError className="text-xs text-danger" />
            </TextField>

            <TextField
              isRequired
              name="location"
              className="w-full flex flex-col gap-1.5"
            >
              <Label className="text-sm font-medium text-zinc-300">
                Location
              </Label>
              <div className="flex items-center bg-[#1e1e21] border border-[#232326] rounded-xl px-3 group">
                <Pin size={16} className="text-zinc-500 mr-1" />
                <Input
                  placeholder="City, Country"
                  value={formValues.location}
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  className="bg-transparent border-0 w-full focus:ring-0 text-sm py-2.5 pl-1"
                />
              </div>
              <FieldError className="text-xs text-danger" />
            </TextField>
          </div>

          {/* Row 3: Employee Count Range & Cloud Logo Upload Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
            <Select
              name="employeeCount"
              className="w-full flex flex-col gap-1.5"
              placeholder="Select employee range"
              selectedKey={formValues.employeeCount}
              onSelectionChange={(key) =>
                setFormValues((prev) => ({ ...prev, employeeCount: key }))
              }
            >
              <Label className="text-sm font-medium text-zinc-300">
                Employee Count Range
              </Label>
              <Select.Trigger className="bg-[#1e1e21] border border-[#232326] rounded-xl text-sm p-3 flex justify-between items-center text-zinc-300">
                <Select.Value>
                  {formValues.employeeCount || "1-10 employees"}
                </Select.Value>
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox className="bg-[#121214] border border-[#232326] rounded-xl p-1 text-zinc-200">
                  {[
                    "1-10 employees",
                    "11-50 employees",
                    "51-200 employees",
                    "201-500 employees",
                    "500+ employees",
                  ].map((range) => (
                    <ListBox.Item
                      key={range}
                      id={range}
                      textValue={range}
                      className="p-2 hover:bg-[#1e1e21] rounded-lg cursor-pointer"
                    >
                      {range}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            {/* Cloud Logo upload layout targeting imgbb */}
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-zinc-300">
                Company Logo
              </span>
              <div className="flex items-center gap-4">
                <label className="border border-dashed border-[#3f3f46] hover:border-violet-500 bg-[#1e1e21]/40 rounded-xl p-4 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-colors w-28 h-24 text-center">
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={handleLogoUpload}
                    disabled={isUploading}
                  />
                  <ArrowUpFromLine size={16} className="text-zinc-400" />
                  <span className="text-[11px] text-zinc-400">
                    {isUploading ? "Uploading..." : "Upload image"}
                  </span>
                </label>

                <div className="space-y-1">
                  {formValues.logoUrl ? (
                    <div>
                      <img
                        src={formValues.logoUrl}
                        alt="Logo Preview"
                        className="w-16 h-16 object-cover rounded-xl border border-[#232326]"
                      />
                      <span className="text-xs text-emerald-400 block mt-1">
                        ✓ Saved to ImgBB
                      </span>
                    </div>
                  ) : (
                    <p className="text-xs text-zinc-500 max-w-45">
                      PNG, JPG up to 5MB.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Row 4: Brief Description */}
          <TextField
            isRequired
            name="description"
            className="w-full flex flex-col gap-1.5"
          >
            <Label className="text-sm font-medium text-zinc-300">
              Brief Description
            </Label>
            <Input
              as="textarea"
              rows={4}
              placeholder="Tell us about your company's mission and culture..."
              value={formValues.description}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="bg-[#1e1e21] border-[#232326] rounded-xl text-sm p-3 h-auto min-h-25"
            />
            <FieldError className="text-xs text-danger" />
          </TextField>
        </Fieldset>

        {/* Control Footer Buttons matching the picture mockup layout */}
        <div className="flex justify-end gap-3 border-t border-[#232326] pt-6">
          <Button
            type="button"
            variant="flat"
            className="rounded-xl px-5 py-2.5 text-zinc-400 border border-[#232326] bg-transparent hover:bg-[#1e1e21] text-sm"
            onClick={() =>
              setViewState(companyData.name ? "viewing" : "not_registered")
            }
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-semibold rounded-xl px-6 py-2.5 shadow-md transition-all text-sm"
            isLoading={isSubmitting}
          >
            Register Company
          </Button>
        </div>
      </Form>
    </div>
  );
}
