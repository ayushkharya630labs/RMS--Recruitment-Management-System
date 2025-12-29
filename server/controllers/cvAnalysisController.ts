import { Request, Response } from "express";
import {
  analyzeAndSaveCVService,
  getCVAnalysisByJobService,
  getAllCandidatesService,
  deleteCandidateService,
} from "../services/cvAnalysisService";

import pdfParse from "pdf-parse";

export const getAllCandidates = async (req: Request, res: Response) => {
  try {
    const candidates = await getAllCandidatesService();
    return res.json({ success: true, data: candidates });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Analyze CV + Save AI result
 */
export const analyzeCV = async (req: Request, res: Response) => {
  try {
    const jobId = Number(req.body.jobId);
    const files = req.files as Express.Multer.File[];

    if (!jobId)
      return res
        .status(400)
        .json({ success: false, message: "jobId required" });

    if (!files?.length)
      return res
        .status(400)
        .json({ success: false, message: "No CV files uploaded" });

    const results: any[] = [];

    for (const file of files) {
      const parsed = await pdfParse(file.buffer);
      const cvText = parsed.text || "";

      const result = await analyzeAndSaveCVService({
        jobId,
        cvText,
      });

      results.push(result);
    }

    return res.status(201).json({ success: true, data: results });
  } catch (err: any) {
    console.error("CV Analyze Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Get all analyzed CVs for a job
 */
export const getCVAnalysisByJob = async (req: Request, res: Response) => {
  try {
    const jobId = Number(req.params.jobId);
    const cvs = await getCVAnalysisByJobService(jobId);

    return res.json({ success: true, data: cvs });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCandidate = async (req: Request, res: Response) => {
  try {
    const candidateId = Number(req.params.id);

    if (!candidateId)
      return res
        .status(400)
        .json({ success: false, message: "Candidate id required" });

    const deleted = await deleteCandidateService(candidateId);

    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Candidate not found" });

    return res.json({
      success: true,
      message: "Candidate & related CV analysis deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
