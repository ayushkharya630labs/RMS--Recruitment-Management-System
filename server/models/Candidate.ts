// models/Candidate.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Candidate extends Model {}

Candidate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    education: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    experienceYears: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    skills: {
      type: DataTypes.JSON, 
      allowNull: true,
    },

    resumePath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "candidates",
    timestamps: true,
  }
);
