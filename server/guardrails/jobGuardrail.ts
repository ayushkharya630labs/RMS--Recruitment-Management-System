import { JobInput } from "../services/jobService";

export function normalizeJobInput(data: JobInput): JobInput {
  // -------- EXPERIENCE FIX --------
  if (
    data.experienceMin !== undefined &&
    data.experienceMax !== undefined &&
    data.experienceMin > data.experienceMax
  ) {
    [data.experienceMin, data.experienceMax] = [
      data.experienceMax,
      data.experienceMin,
    ];
  }

  // -------- SALARY FIX --------
  if (
    data.salaryMin !== undefined &&
    data.salaryMax !== undefined &&
    data.salaryMin > data.salaryMax
  ) {
    [data.salaryMin, data.salaryMax] = [
      data.salaryMax,
      data.salaryMin,
    ];
  }

  // -------- DEFAULTS --------
  data.companyName = data.companyName || "Unknown Client";
  data.jdSource = data.jdSource || "email";
  data.priority = data.priority || "medium";
  data.currency = data.currency || "INR";

  return data;
}
