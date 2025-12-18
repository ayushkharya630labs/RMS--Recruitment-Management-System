import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { sequelize, testDBConnection } from "./config/database";

// auto register models
import "./models/Job";
import "./models/JobSkill";
import "./models/SourcingKeyword";

import jobRoutes from "./routes/jobRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(express.json());

app.use("/api/jobs", jobRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    console.log("Server running on", PORT);

    await testDBConnection();

    await sequelize.sync({ alter: true });

    console.log("📦 Database synced!");
  } catch (err) {
    console.error(err);
  }
});
