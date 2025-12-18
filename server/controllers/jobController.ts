import { Request, Response } from "express";
import { createJobService, getAllJobService } from "../services/jobService";

export const createJob = async (req: Request, res: Response) => {
  try {
    const job = await createJobService(req.body);

    return res.status(201).json({
      success: true,
      message: "Job created successfully!",
      data: job,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await getAllJobService();

    return res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
