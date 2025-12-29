import { Job } from "../models/Job";
import { Candidate } from "../models/Candidate";
import { CvAnalysis } from "../models/CvAnalysis";
import { scoreCV_AI } from "./cvScoringAI";
import { parseCV_AI } from "./cvParserAI";

/**
 * Get All Candidates
 */
export const getAllCandidatesService = async () => {
  return await Candidate.findAll({
    include: [CvAnalysis],
    order: [["createdAt", "DESC"]],
  });
};

// 🔹 normalize exp before saving
const normalizeExperience = (val: any) => {
  if (!val) return null;
  const num = parseFloat(String(val).match(/[\d\.]+/)?.[0]);
  return isNaN(num) ? null : num;
};

export const analyzeAndSaveCVService = async ({
  jobId,
  cvText,
}: {
  jobId: number;
  cvText: string;
}) => {
  const job = await Job.findByPk(jobId);
  if (!job) throw new Error("Job not found");

  // 1️⃣ AI Parse CV → structured JSON
  const parsed = await parseCV_AI(cvText);

  // 2️⃣ Save Candidate
  const candidate = await Candidate.create({
    name: parsed.name || "Unknown",
    email: parsed.email || null,
    phone: parsed.phone || null,
    location: parsed.location || null,

    totalExperience: normalizeExperience(parsed.totalExperience),
    currentRole: parsed.currentRole || null,

    skills: parsed.skills || [],

    summary: parsed.summary || null,
    experience: parsed.experience || [],
    education: parsed.education || [],
    certifications: parsed.certifications || [],
    projects: parsed.projects || [],
    achievements: parsed.achievements || [],

    rawText: cvText,
  });

  // 3️⃣ AI Score (Job Match)
  const score = await scoreCV_AI(job.description, cvText);

  const analysis = await CvAnalysis.create({
    jobId,
    candidateId: candidate.id,
    ...score,
  });

  return { candidate, analysis };
};

/**
 * Get analyzed CVs for a job
 */
export const getCVAnalysisByJobService = async (jobId: number) => {
  return await CvAnalysis.findAll({
    where: { jobId },
    include: [Candidate],
    order: [["overallScore", "DESC"]],
  });
};

export const deleteCandidateService = async (candidateId: number) => {
  await CvAnalysis.destroy({ where: { candidateId } });
  return await Candidate.destroy({ where: { id: candidateId } });
};
