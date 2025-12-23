import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
// http://localhost:5000/api

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

// 1️⃣ Parse JD using AI
export const parseJD = async (text: string): Promise<AIParseResponse> => {
  const res = await axios.post(`${BASE_URL}/jd/parse`, { text });
  return res.data.data;
};

// 2️⃣ Create Job
export const createJob = async (payload: CreateJobPayload) => {
  const res = await axios.post(`${BASE_URL}/jobs/create`, payload);
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
