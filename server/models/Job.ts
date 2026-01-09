import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Job extends Model {}

Job.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    // 🔹 Client / Company Details
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    hiringManagerName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    hiringManagerEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    jdSource: {
      type: DataTypes.STRING, // email | whatsapp | portal | referral
      allowNull: true,
    },

    priority: {
      type: DataTypes.STRING, // high | medium | low
      defaultValue: "medium",
    },

    // 🔹 Core Job Fields
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },

    department: DataTypes.STRING,
    location: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,

    jobType: DataTypes.STRING, // full-time | contract

    experienceMin: DataTypes.INTEGER,
    experienceMax: DataTypes.INTEGER,

    salaryMin: DataTypes.INTEGER,
    salaryMax: DataTypes.INTEGER,
    currency: DataTypes.STRING,

    skillsRequired: DataTypes.TEXT, // comma list
    remoteAvailable: { type: DataTypes.BOOLEAN, defaultValue: false },
    visaRequired: { type: DataTypes.BOOLEAN, defaultValue: false },
    educationLevel: DataTypes.STRING,

    status: { type: DataTypes.STRING, defaultValue: "active" },
  },
  { sequelize, tableName: "jobs", timestamps: true }
);
