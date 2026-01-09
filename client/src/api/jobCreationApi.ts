import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

// ---------- TYPES ---------- //

export interface AIParseResponse {
  title: string;
  skillsMustHave: string[];
  skillsNiceToHave: string[];
  experienceRange: string;
  location: string;
  salaryRange: string;
  education: string;
  keywords: string[];
  technicalStack: string[];
  softSkills: string[];
}

export interface CreateJobPayload {
  title: string;
  description: string;
  companyName: string;
  hiringManagerName?: string;
  hiringManagerEmail?: string;
  jdSource?: string;
  priority?: string;

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

// ---------- APIs ---------- //

// 1️⃣ Parse JD using AI (Safe)
export const parseJD = async (text: string): Promise<AIParseResponse> => {
  try {
    const res = await axios.post(`${BASE_URL}/jd/parse`, { text });

    if (!res.data?.success) {
      throw new Error(res.data?.message || "AI parsing failed");
    }

    const parsed = res.data?.data;

    if (!parsed || typeof parsed !== "object") {
      throw new Error("Invalid AI response");
    }

    return parsed as AIParseResponse;
  } catch (err: any) {
    console.error("❌ JD Parse Error:", err?.response?.data || err);
    throw new Error(
      err?.response?.data?.message || "Unable to parse JD. Try again."
    );
  }
};

// 2️⃣ Create Job
export const createJob = async (payload: CreateJobPayload) => {
  const res = await axios.post(`${BASE_URL}/jobs/create`, payload);

  if (!res.data?.success) {
    throw new Error(res.data?.message || "Job creation failed");
  }

  return res.data.data;
};

// 3️⃣ Get all jobs list
export const getJobs = async () => {
  const res = await axios.get(`${BASE_URL}/jobs/list`);
  return res.data.data;
};

// 4️⃣ Delete Job
export async function deleteJob(id: number) {
  const res = await axios.delete(`${BASE_URL}/jobs/delete/${id}`);
  return res.data.success;
}
