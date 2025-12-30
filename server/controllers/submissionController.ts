import { Request, Response } from "express";
import {
  createSubmissionService,
  getSubmissionByIdService,
  listSubmissionsService,
  updateSubmissionCandidateStatusService,
} from "../services/submissionService";

export const createSubmission = async (req: Request, res: Response) => {
  try {
    const submission = await createSubmissionService(req.body);

    res.status(201).json({
      success: true,
      message: "Submission created successfully",
      data: submission,
    });
  } catch (err: any) {
    console.error("Create Submission Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getSubmissionById = async (req: Request, res: Response) => {
  try {
    const submission = await getSubmissionByIdService(Number(req.params.id));
    res.json({ success: true, data: submission });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const listSubmissions = async (_req: Request, res: Response) => {
  try {
    const submissions = await listSubmissionsService();
    res.json({ success: true, data: submissions });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateSubmissionCandidateStatus = async (req: Request, res: Response) => {
  try {
    const { status, remarks } = req.body;

    await updateSubmissionCandidateStatusService(
      Number(req.params.id),
      status,
      remarks
    );

    res.json({ success: true, message: "Candidate status updated" });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
