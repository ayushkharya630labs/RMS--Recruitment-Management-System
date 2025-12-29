import Groq from "groq-sdk";
import fs from "fs";
import path from "path";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

const prompt = fs.readFileSync(
  path.join(process.cwd(), "prompts", "cvParsingPrompt.txt"),
  "utf8"
);

export const parseCV_AI = async (cvText: string) => {
  const res = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: prompt },
      { role: "user", content: cvText },
    ],
    temperature: 0.2,
  });

  let out = res.choices[0].message?.content || "{}";
  if (out.startsWith("```")) out = out.replace(/```json|```/g, "").trim();

  return JSON.parse(out);
};
