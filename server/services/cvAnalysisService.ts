import { Job } from "../models/Job";
import { Candidate } from "../models/Candidate";
import { CvAnalysis } from "../models/CvAnalysis";
import { scoreCV_AI } from "./cvScoringAI";


/**
 * Get All Candidates
 */
export const getAllCandidatesService = async () => {
  return await Candidate.findAll({
    include: [CvAnalysis],
    order: [["createdAt", "DESC"]],
  });
};

export const analyzeAndSaveCVService = async (payload: {
  jobId: number;
  cvText: string;
  candidate: {
    name: string;
    location?: string;
    education?: string;
    experienceYears?: number;
    skills?: string[];
  };
}) => {
  // 1️⃣ Fetch Job
  const job = await Job.findByPk(payload.jobId);
  if (!job) throw new Error("Job not found");

  // 2️⃣ AI SCORING
  const aiResult = await scoreCV_AI(
    job.description,
    payload.cvText
  );

  // 3️⃣ Save Candidate
  const candidate = await Candidate.create({
    name: payload.candidate.name,
    location: payload.candidate.location,
    education: payload.candidate.education,
    experienceYears: payload.candidate.experienceYears,
    skills: payload.candidate.skills,
  });

  // 4️⃣ Save Analysis
  const analysis = await CvAnalysis.create({
    jobId: payload.jobId,
    candidateId: candidate.id,

    skillMatch: aiResult.skillMatch,
    experienceMatch: aiResult.experienceMatch,
    overallScore: aiResult.overallScore,
    recommendation: aiResult.recommendation,

    matchedSkills: aiResult.matchedSkills,
    missingSkills: aiResult.missingSkills,
    aiExplanation: aiResult.explanation,
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
  // delete mappings first
  await CvAnalysis.destroy({ where: { candidateId } });

  // delete candidate
  const deleted = await Candidate.destroy({ where: { id: candidateId } });

  return deleted;
};