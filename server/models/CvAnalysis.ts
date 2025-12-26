// models/CvAnalysis.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { Candidate } from "./Candidate";
import { Job } from "./Job";

export class CvAnalysis extends Model {}

CvAnalysis.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    skillMatch: {
      type: DataTypes.INTEGER, // %
      allowNull: true,
    },

    experienceMatch: {
      type: DataTypes.INTEGER, // %
      allowNull: true,
    },

    overallScore: {
      type: DataTypes.INTEGER, // %
      allowNull: true,
    },

    recommendation: {
      type: DataTypes.STRING, // Strong / Good / Reject
      allowNull: true,
    },

    matchedSkills: {
      type: DataTypes.JSON, // ["Node.js","AWS"]
      allowNull: true,
    },

    missingSkills: {
      type: DataTypes.JSON, // ["Kubernetes"]
      allowNull: true,
    },

    aiExplanation: {
      type: DataTypes.TEXT, // used in "Explain Score" modal
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "cv_analysis",
    timestamps: true,
  }
);

CvAnalysis.belongsTo(Candidate, { foreignKey: "candidateId" });
CvAnalysis.belongsTo(Job, { foreignKey: "jobId" });

Candidate.hasMany(CvAnalysis, { foreignKey: "candidateId" });
Job.hasMany(CvAnalysis, { foreignKey: "jobId" });
