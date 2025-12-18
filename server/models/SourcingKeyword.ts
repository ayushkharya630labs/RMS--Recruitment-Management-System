import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { Job } from "./Job";

export class SourcingKeyword extends Model {}

SourcingKeyword.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    word: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: "sourcing_keywords",
    timestamps: false,
  }
);

SourcingKeyword.belongsTo(Job, { foreignKey: "jobId" });
Job.hasMany(SourcingKeyword, { foreignKey: "jobId" });
