import Groq from "groq-sdk";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

const promptPath = path.join(process.cwd(), "prompts", "cvScoringPrompt.txt");
const systemPrompt = fs.readFileSync(promptPath, "utf8");

export const scoreCV_AI = async (
  jobText: string,
  cvText: string
) => {
  try {
    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `
JOB DESCRIPTION:
${jobText}

CANDIDATE CV:
${cvText}
          `,
        },
      ],
      temperature: 0.1,
    });

    let output = completion.choices[0].message?.content || "{}";
    output = output.trim();

    if (output.startsWith("```")) {
      output = output.replace(/```json|```/g, "").trim();
    }

    return JSON.parse(output);
  } catch (err) {
    console.log("❌ CV AI SCORING ERROR – fallback used");

    return {
      skillMatch: 0,
      experienceMatch: 0,
      overallScore: 0,
      matchedSkills: [],
      missingSkills: [],
      recommendation: "Low Match",
      explanation: "AI scoring failed. Please retry.",
    };
  }
};
