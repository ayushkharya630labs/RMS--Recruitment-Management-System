// models/Submission.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { Job } from "./Job";

export class Submission extends Model {}

Submission.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    jobId: { type: DataTypes.INTEGER, allowNull: false },

    // Client details (agency workflow)
    clientName: { type: DataTypes.STRING, allowNull: true },
    clientEmail: { type: DataTypes.STRING, allowNull: true },

    // Email tracking
    subject: { type: DataTypes.STRING, allowNull: true },
    notes: { type: DataTypes.TEXT, allowNull: true },

    // Submission stage
    status: {
      type: DataTypes.ENUM(
        "draft",
        "submitted",
        "shortlisted",
        "rejected",
        "on-hold",
        "hired"
      ),
      defaultValue: "submitted",
    },

    // Attachments references (future scope)
    excelFilePath: { type: DataTypes.STRING },
    brandedZipPath: { type: DataTypes.STRING },
  },
  {
    sequelize,
    tableName: "submissions",
    timestamps: true,
  }
);

Submission.belongsTo(Job, { foreignKey: "jobId" });
Job.hasMany(Submission, { foreignKey: "jobId" });
