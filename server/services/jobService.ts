import { Job } from "../models/Job";

interface JobInput {
  title: string;
  description: string;
  department?: string;
  location?: string;
  country?: string;
  city?: string;
  jobType?: string;
  experienceMin?: number;
  experienceMax?: number;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  skillsRequired?: string;
  remoteAvailable?: boolean;
  visaRequired?: boolean;
  educationLevel?: string;
}

export const createJobService = async (data: JobInput) => {
  return await Job.create({
    title: data.title,
    description: data.description,
    department: data.department,
    location: data.location,
    country: data.country,
    city: data.city,
    jobType: data.jobType,
    experienceMin: data.experienceMin,
    experienceMax: data.experienceMax,
    salaryMin: data.salaryMin,
    salaryMax: data.salaryMax,
    currency: data.currency,
    skillsRequired: data.skillsRequired,
    remoteAvailable: data.remoteAvailable,
    visaRequired: data.visaRequired,
    educationLevel: data.educationLevel,
  });
};

export const getAllJobService = async () => {
  return await Job.findAll({
    order: [["id", "DESC"]],
  });
};
