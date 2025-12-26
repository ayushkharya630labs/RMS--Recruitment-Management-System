import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
// http://localhost:5000/api

export interface AnalyzeCVRequest {
  jobId: number;
  cvs: {
    name: string;
    size: number;
    type: string;
    content?: string; // later for real file parsing
  }[];
}

export const analyzeCVsApi = async (formData: FormData) => {
  const res = await axios.post(
    `${BASE_URL}/cv/analyze`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return res.data;
};

export const getAnalyzedCVsByJob = async (jobId: number) => {
  const res = await axios.get(`${BASE_URL}/cv/job/${jobId}`);
  return res.data.data;
};

export const getAllCandidatesApi = async () => {
  const res = await axios.get(`${BASE_URL}/cv/candidates`);
  return res.data.data;
};

export const deleteCandidateApi = async (id: number) => {
  const res = await axios.delete(`${BASE_URL}/cv/candidate/${id}`);
  return res.data;
};

