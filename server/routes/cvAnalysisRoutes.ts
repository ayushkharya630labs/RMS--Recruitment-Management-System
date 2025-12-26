import express from "express";
import {
  analyzeCV,
  getCVAnalysisByJob,
  getAllCandidates,
  deleteCandidate
} from "../controllers/cvAnalysisController";
import { uploadCVs } from "../middleware/upload";

const router = express.Router();

/**
 * Analyze CV & save AI scoring
 * POST /api/cv/analyze
 */
router.post("/analyze", uploadCVs, analyzeCV);

/**
 * Get all CV analysis for a job
 * GET /api/cv/job/:jobId
 */
router.get("/job/:jobId", getCVAnalysisByJob);

// Get all candidates
router.get("/candidates", getAllCandidates);

// Delete candidate + related CV analysis
router.delete("/candidate/:id", deleteCandidate);


export default router;
