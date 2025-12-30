import { Submission } from "../models/Submission";
import { SubmissionCandidate } from "../models/SubmissionCandidate";
import { Candidate } from "../models/Candidate";
import { CvAnalysis } from "../models/CvAnalysis";

interface CreateSubmissionPayload {
  jobId: number;
  clientName?: string;
  clientEmail?: string;
  subject?: string;
  notes?: string;

  candidates: {
    candidateId: number;
  }[];
}

export const createSubmissionService = async (payload: CreateSubmissionPayload) => {
  const submission = await Submission.create({
    jobId: payload.jobId,
    clientName: payload.clientName,
    clientEmail: payload.clientEmail,
    subject: payload.subject,
    notes: payload.notes,
    status: "submitted",
  });

  for (const c of payload.candidates) {
    // freeze latest score at submission time
    const latestAnalysis = await CvAnalysis.findOne({
      where: { candidateId: c.candidateId, jobId: payload.jobId },
      order: [["createdAt", "DESC"]],
    });

    await SubmissionCandidate.create({
      submissionId: submission.id,
      candidateId: c.candidateId,
      overallScore: latestAnalysis?.get("overallScore") as number | null,
      skillMatch: latestAnalysis?.get("skillMatch") as number | null,
      status: "submitted",
    });
  }

  return submission;
};

export const getSubmissionByIdService = async (id: number) => {
  return Submission.findByPk(id, {
    include: [
      {
        model: SubmissionCandidate,
        include: [{ model: Candidate }],
      },
    ],
  });
};

export const listSubmissionsService = async () => {
  return Submission.findAll({
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: SubmissionCandidate,
        include: [{ model: Candidate }],
      },
    ],
  });
};

export const updateSubmissionCandidateStatusService = async (
  submissionCandidateId: number,
  status: string,
  remarks?: string
) => {
  return SubmissionCandidate.update(
    { status, remarks },
    { where: { id: submissionCandidateId } }
  );
};
