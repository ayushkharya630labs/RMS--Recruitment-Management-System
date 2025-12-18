import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { Job } from "./Job";

export class JobSkill extends Model {}

JobSkill.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: DataTypes.STRING,
    type: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: "job_skills",
    timestamps: false,
  }
);

JobSkill.belongsTo(Job, { foreignKey: "jobId" });
Job.hasMany(JobSkill, { foreignKey: "jobId" });
