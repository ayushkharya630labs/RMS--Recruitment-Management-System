interface ParsedJD {
  title: string | null;
  skillsMustHave: string[];
  skillsNiceToHave: string[];
  experienceRange: string | null;
  location: string | null;
  salaryRange: string | null;
  education: string | null;
  keywords: string[];
  technicalStack: string[];
  softSkills: string[];
}

/**
 * 🔐 AI OUTPUT NORMALIZER
 * This function GUARANTEES safe & usable JD data
 */
export function normalizeParsedJD(raw: ParsedJD) {
  const unique = (arr: string[] = []) =>
    Array.from(new Set(arr.map(s => s.trim()).filter(Boolean)));

  // -------- EXPERIENCE --------
  let experienceRange = raw.experienceRange;
  if (!experienceRange || !/\d/.test(experienceRange)) {
    experienceRange = "2-5 years";
  }

  // -------- SALARY --------
  let salaryRange = raw.salaryRange;
  if (!salaryRange || !/\d/.test(salaryRange)) {
    salaryRange = "As per market standards";
  }

  return {
    title: raw.title?.trim() || "Software Engineer",

    skillsMustHave:
      unique(raw.skillsMustHave).length >= 3
        ? unique(raw.skillsMustHave)
        : ["Problem Solving", "Communication", "Technical Skills"],

    skillsNiceToHave: unique(raw.skillsNiceToHave),

    experienceRange,

    location: raw.location?.trim() || "India",

    salaryRange,

    education:
      raw.education?.trim() ||
      "Bachelor’s degree in relevant discipline",

    keywords:
      unique(raw.keywords).length >= 10
        ? unique(raw.keywords)
        : unique([
            ...raw.skillsMustHave,
            ...raw.technicalStack,
            "software",
            "developer",
            "engineering",
          ]).slice(0, 15),

    technicalStack:
      unique(raw.technicalStack).length >= 5
        ? unique(raw.technicalStack)
        : unique(raw.skillsMustHave).slice(0, 5),

    softSkills:
      unique(raw.softSkills).length
        ? unique(raw.softSkills)
        : [
            "communication",
            "teamwork",
            "problem solving",
            "ownership",
            "adaptability",
          ],
  };
}
