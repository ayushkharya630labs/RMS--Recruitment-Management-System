import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
// http://localhost:5000/api

// ----------- TYPES ----------- //

export interface SubmissionCandidatePayload {
  candidateId: number;
}

export interface CreateSubmissionPayload {
  jobId: number;
  clientName?: string;
  clientEmail?: string;
  subject?: string;
  notes?: string;

  candidates: SubmissionCandidatePayload[];
}

// ----------- APIs ----------- //

// 1️⃣ Create a New Submission
export const createSubmissionApi = async (payload: CreateSubmissionPayload) => {
  const res = await axios.post(`${BASE_URL}/submissions`, payload);
  return res.data.data;
};

// 2️⃣ Get All Submissions
export const getSubmissionsApi = async () => {
  const res = await axios.get(`${BASE_URL}/submissions`);
  return res.data.data;
};

// 3️⃣ Get Single Submission (with candidates)
export const getSubmissionByIdApi = async (id: number) => {
  const res = await axios.get(`${BASE_URL}/submissions/${id}`);
  return res.data.data;
};

// 4️⃣ Update Candidate Status inside Submission
export const updateSubmissionCandidateStatusApi = async (
  submissionCandidateId: number,
  status: string,
  remarks?: string
) => {
  const res = await axios.put(
    `${BASE_URL}/submissions/candidate/${submissionCandidateId}/status`,
    { status, remarks }
  );

  return res.data.success;
};
