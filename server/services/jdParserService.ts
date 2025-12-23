import Groq from "groq-sdk";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

const promptPath = path.join(process.cwd(), "prompts", "jdParserPrompt.txt");
const systemPrompt = fs.readFileSync(promptPath, "utf8");

export const parseJD_AI = async (rawText: string) => {
  try {

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: rawText }
      ],
      temperature: 0.1,
    });

    let output = completion.choices[0].message?.content || "{}";

    // Remove spaces & formatting trash
    output = output.trim();

    // AI sometimes wraps json with ```json 
    if (output.startsWith("```")) {
      output = output.replace(/```json|```/g, "").trim();
    }

    return JSON.parse(output);

  } catch (err) {

    console.log("❌ AI JSON ERROR → Fallback used");

    return {
      title: null,
      skillsMustHave: [],
      skillsNiceToHave: [],
      experienceRange: null,
      location: null,
      salaryRange: null,
      education: null,
      keywords: [],
      technicalStack: [],
      softSkills: []
    };
  }
};
