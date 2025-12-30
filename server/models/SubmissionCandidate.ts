// models/SubmissionCandidate.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { Candidate } from "./Candidate";
import { Submission } from "./Submission";

export class SubmissionCandidate extends Model {}

SubmissionCandidate.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    submissionId: { type: DataTypes.INTEGER, allowNull: false },
    candidateId: { type: DataTypes.INTEGER, allowNull: false },

    // Freeze score snapshot at submission time
    overallScore: { type: DataTypes.INTEGER, allowNull: true },
    skillMatch: { type: DataTypes.INTEGER, allowNull: true },

    // Status lifecycle for agency
    status: {
      type: DataTypes.ENUM(
        "submitted",
        "shortlisted",
        "interview_scheduled",
        "interviewed",
        "rejected",
        "offer_made",
        "hired"
      ),
      defaultValue: "submitted",
    },

    // Optional notes between agency ↔ client
    remarks: { type: DataTypes.TEXT },
  },
  {
    sequelize,
    tableName: "submission_candidates",
    timestamps: true,
  }
);

SubmissionCandidate.belongsTo(Submission, { foreignKey: "submissionId" });
SubmissionCandidate.belongsTo(Candidate, { foreignKey: "candidateId" });

Submission.hasMany(SubmissionCandidate, { foreignKey: "submissionId" });
Candidate.hasMany(SubmissionCandidate, { foreignKey: "candidateId" });
