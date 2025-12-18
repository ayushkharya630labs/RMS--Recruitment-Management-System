import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Job extends Model {}

Job.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    department: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    jobType: {
      type: DataTypes.STRING,       // full-time, part-time, contract
      allowNull: true,
    },

    experienceMin: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    experienceMax: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    salaryMin: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    salaryMax: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    currency: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    skillsRequired: {
      type: DataTypes.TEXT, // comma separated list
      allowNull: true,
    },

    remoteAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    visaRequired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    educationLevel: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: "active",
    },
  },
  {
    sequelize,
    tableName: "jobs",
    timestamps: true,
  }
);
