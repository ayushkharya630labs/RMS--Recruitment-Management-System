import { Job } from "../models/Job";
import { JobSkill } from "../models/JobSkill";
import { SourcingKeyword } from "../models/SourcingKeyword";

interface JobInput {
  companyName?: string;
  hiringManagerName?: string;
  hiringManagerEmail?: string;
  jdSource?: string;
  priority?: string;

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

  skills?: { name: string; type: string }[];
  keywords?: string[];
}

export const createJobService = async (data: JobInput) => {
  const job = await Job.create({
    companyName: data.companyName || "Unknown Client",
    hiringManagerName: data.hiringManagerName || null,
    hiringManagerEmail: data.hiringManagerEmail || null,
    jdSource: data.jdSource || "email",
    priority: data.priority || "medium",

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
    remoteAvailable: data.remoteAvailable ?? false,
    visaRequired: data.visaRequired ?? false,
    educationLevel: data.educationLevel,
  });

  if (data.skills?.length) {
    await JobSkill.bulkCreate(
      data.skills.map(s => ({
        jobId: job.id,
        name: s.name,
        type: s.type,
      }))
    );
  }

  if (data.keywords?.length) {
    await SourcingKeyword.bulkCreate(
      data.keywords.map(word => ({
        jobId: job.id,
        word,
      }))
    );
  }

  return job;
};

// GET JOB LIST
export const getAllJobService = async () => {
  return await Job.findAll({
    order: [["id", "DESC"]],
    include: [JobSkill, SourcingKeyword],
  });
};

// DELETE JOB + CHILD DATA
export const deleteJobService = async (jobId: number) => {

  // remove skills
  await JobSkill.destroy({ where: { jobId } });

  // remove keywords
  await SourcingKeyword.destroy({ where: { jobId } });

  // remove job
  const deleted = await Job.destroy({
    where: { id: jobId }
  });

  return deleted;
};
