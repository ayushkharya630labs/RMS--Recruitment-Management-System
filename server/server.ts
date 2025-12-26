import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";

import { sequelize, testDBConnection } from "./config/database";

// auto register models
import "./models/Job";
import "./models/JobSkill";
import "./models/SourcingKeyword";

import jobRoutes from "./routes/jobRoutes";
import jdParserRoutes from "./routes/jdParserRoutes";
import cvAnalysisRoutes from "./routes/cvAnalysisRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(express.json());

// ⭐ CORS CONNECT
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/jobs", jobRoutes);
app.use("/api/jd", jdParserRoutes);
app.use("/api/cv", cvAnalysisRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    console.log("Server running on", PORT);

    await testDBConnection();

    await sequelize.sync({ alter: true });

    console.log("📦 Database synced!");
    console.log("🌍 CORS allowed for:", process.env.FRONTEND_URL);
  } catch (err) {
    console.error(err);
  }
});
