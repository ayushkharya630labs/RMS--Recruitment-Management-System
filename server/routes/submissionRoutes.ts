import { Router } from "express";
import {
  createSubmission,
  getSubmissionById,
  listSubmissions,
  updateSubmissionCandidateStatus,
} from "../controllers/submissionController";

const router = Router();

router.post("/", createSubmission);
router.get("/", listSubmissions);
router.get("/:id", getSubmissionById);

// update candidate status inside submission
router.put("/candidate/:id/status", updateSubmissionCandidateStatus);

export default router;
