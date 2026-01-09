import Groq from "groq-sdk";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { normalizeParsedJD } from "../guardrails"; 

dotenv.config();

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

const promptPath = path.join(process.cwd(), "prompts", "jdParserPrompt.txt");
const systemPrompt = fs.readFileSync(promptPath, "utf8");

/**
 * 🔐 AI JD PARSER WITH ENTERPRISE GUARDRAILS
 * - AI may fail
 * - AI may return partial data
 * - This function GUARANTEES usable output
 */
export const parseJD_AI = async (rawText: string) => {
  try {
    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: rawText },
      ],
      temperature: 0.1,
    });

    let output = completion.choices[0].message?.content || "{}";
    output = output.trim();

    // Remove ```json wrapper if AI adds it
    if (output.startsWith("```")) {
      output = output.replace(/```json|```/g, "").trim();
    }

    const parsed = JSON.parse(output);

    // 🔐 APPLY GUARDRAILS HERE
    return normalizeParsedJD(parsed);

  } catch (err) {
    console.error("❌ AI FAILED → Guardrail fallback used");

    // 🔐 SAFE FALLBACK (never breaks UI / DB)
    return normalizeParsedJD({
      title: null,
      skillsMustHave: [],
      skillsNiceToHave: [],
      experienceRange: null,
      location: null,
      salaryRange: null,
      education: null,
      keywords: [],
      technicalStack: [],
      softSkills: [],
    });
  }
};
