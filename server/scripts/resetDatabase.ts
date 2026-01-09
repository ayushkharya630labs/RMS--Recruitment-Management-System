import { sequelize } from "../config/database";

// 🔥 IMPORTANT: import ALL models so Sequelize registers tables
import "../models/Job";
import "../models/JobSkill";
import "../models/SourcingKeyword";
import "../models/Candidate";
import "../models/CvAnalysis";
import "../models/Submission";
import "../models/SubmissionCandidate";

const resetDB = async () => {
  try {
    console.log("⚠️ RESETTING DATABASE (FOR DEVELOPMENT ONLY)");

    // 1️⃣ Disable FK checks
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

    // 2️⃣ Truncate ALL tables
    await sequelize.truncate({
      cascade: true,
      restartIdentity: true,
    });

    // 3️⃣ Enable FK checks again
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");

    console.log("✅ All tables cleared successfully");
    process.exit(0);

  } catch (err) {
    console.error("❌ Failed to reset DB", err);
    process.exit(1);
  }
};

resetDB();
