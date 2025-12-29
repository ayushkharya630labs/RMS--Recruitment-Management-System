import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Candidate extends Model {}

Candidate.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    name: { type: DataTypes.STRING, allowNull: false },

    email: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    location: { type: DataTypes.STRING },

    // Always numeric or NULL
    totalExperience: { type: DataTypes.FLOAT, allowNull: true },

    currentRole: { type: DataTypes.STRING },

    skills: { type: DataTypes.JSON },

    summary: { type: DataTypes.TEXT },
    experience: { type: DataTypes.JSON },
    education: { type: DataTypes.JSON },
    certifications: { type: DataTypes.JSON },
    projects: { type: DataTypes.JSON },
    achievements: { type: DataTypes.JSON },

    rawText: { type: DataTypes.TEXT },
  },
  {
    sequelize,
    tableName: "candidates",
    timestamps: true,
  }
);
