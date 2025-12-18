import express from "express";
import { createJob, getAllJobs } from "../controllers/jobController";

const router = express.Router();

// Create a new job
router.post("/create", createJob);

// Get all jobs
router.get("/list", getAllJobs);

export default router;
