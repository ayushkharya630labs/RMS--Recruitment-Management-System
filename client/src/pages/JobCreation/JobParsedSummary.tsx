import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaEdit, FaBuilding } from "react-icons/fa";
import { createJob } from "../../api/jobCreationApi";

const JobParsedSummary = () => {
  const navigate = useNavigate();

  const [payload, setPayload] = useState<any>(null); // full stored object
  const [parsed, setParsed] = useState<any>(null);   // ai-parsed JD section
  const [saving, setSaving] = useState(false);

  // ---------- Helpers ----------
  const toLPA = (value?: number | null) => {
    if (!value || isNaN(value)) return "-";
    return (value / 100000).toFixed(1).replace(/\.0$/, "") + " LPA";
  };

  useEffect(() => {
    const stored = localStorage.getItem("parsedJD");

    if (!stored) return navigate("/jobs/create");

    try {
      const data = JSON.parse(stored);
      setPayload(data);
      setParsed(data.parsed); // important
    } catch {
      navigate("/jobs/create");
    }
  }, []);

  if (!payload || !parsed) return null;

  // ---------- SAVE TO DATABASE ----------
  const handleSaveJob = async () => {
    try {
      setSaving(true);

      // Safe numeric extraction
      const expMin = Number(parsed.experienceRange?.match(/\d+/)?.[0]) || null;
      const expMax =
        Number(parsed.experienceRange?.match(/-(\d+)/)?.[1]) ||
        expMin ||
        null;

      const salMin = Number(parsed.salaryRange?.match(/\d+/)?.[0]) || null;
      const salMax =
        Number(parsed.salaryRange?.match(/-(\d+)/)?.[1]) ||
        salMin ||
        null;

      const payloadToSave = {
        // -------- Client / JD Meta --------
        companyName: payload.companyName,
        hiringManagerName: payload.hiringManagerName,
        hiringManagerEmail: payload.hiringManagerEmail,
        jdSource: payload.jdSource,
        priority: payload.priority,

        // -------- Core Job Fields --------
        title: parsed.title,
        description: payload.rawJD || "Imported from AI Assistant",

        location: parsed.location,
        educationLevel: parsed.education,

        experienceMin: expMin,
        experienceMax: expMax,

        salaryMin: salMin,
        salaryMax: salMax,
        currency: "INR",

        skillsRequired: (parsed.skillsMustHave || []).join(", "),

        // job_skills table
        skills: [
          ...(parsed.skillsMustHave || []).map((s: string) => ({
            name: s,
            type: "must",
          })),
          ...(parsed.skillsNiceToHave || []).map((s: string) => ({
            name: s,
            type: "nice",
          })),
        ],

        // sourcing_keywords table
        keywords: parsed.keywords || [],
      };

      await createJob(payloadToSave);

      localStorage.removeItem("parsedJD");
      navigate("/jobs/list");
    } catch {
      alert("Saving failed");
    } finally {
      setSaving(false);
    }
  };

  // ---------- Derive LPA Preview ----------
  const expMin = Number(parsed.experienceRange?.match(/\d+/)?.[0]) || null;
  const expMax =
    Number(parsed.experienceRange?.match(/-(\d+)/)?.[1]) ||
    expMin ||
    null;

  const salMin = Number(parsed.salaryRange?.match(/\d+/)?.[0]) || null;
  const salMax =
    Number(parsed.salaryRange?.match(/-(\d+)/)?.[1]) ||
    salMin ||
    null;

  return (
    <div className="text-white pb-20">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Parsed Job Summary</h1>

        <button
          onClick={() => alert("Inline editing coming soon")}
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-2"
        >
          <FaEdit /> Edit Fields
        </button>
      </div>

      {/* CLIENT DETAILS */}
      <section className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-6">
        <h2 className="text-xl text-blue-400 font-semibold flex items-center gap-2 mb-2">
          <FaBuilding /> Client Details
        </h2>

        <p className="text-lg text-white">
          <b>{payload.companyName}</b>
        </p>

        <p className="text-gray-400 mt-1">
          {payload.hiringManagerName || "—"} •{" "}
          {payload.hiringManagerEmail || "—"}
        </p>

        <p className="text-gray-400 mt-1">
          Source: {payload.jdSource} • Priority:{" "}
          <b className="text-blue-300">{payload.priority}</b>
        </p>
      </section>

      {/* JOB TITLE */}
      <section className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-6">
        <h2 className="text-xl text-blue-400 mb-2 font-semibold">Job Title</h2>
        <p className="text-2xl font-bold text-white">{parsed.title}</p>
      </section>

      {/* MUST HAVE SKILLS */}
      <section className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-6">
        <h2 className="text-xl text-blue-400 mb-4 font-semibold">
          Must-Have Skills
        </h2>

        <div className="flex gap-3 flex-wrap">
          {(parsed.skillsMustHave || []).map((s: string, i: number) => (
            <span key={i} className="px-4 py-2 bg-blue-600 rounded-full">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* NICE TO HAVE */}
      <section className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-6">
        <h2 className="text-xl text-blue-400 mb-4 font-semibold">
          Nice-to-Have Skills
        </h2>

        <div className="flex gap-3 flex-wrap">
          {(parsed.skillsNiceToHave || []).map((s: string, i: number) => (
            <span key={i} className="px-4 py-2 bg-gray-700 rounded-full">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* JOB META GRID */}
      <div className="grid grid-cols-2 gap-6">

        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h3 className="text-blue-300 mb-2">Experience</h3>
          <p>{parsed.experienceRange}</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h3 className="text-blue-300 mb-2">Location</h3>
          <p>{parsed.location}</p>
        </div>

        {/* SALARY IN LPA (Real Recruiter Format) */}
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h3 className="text-blue-300 mb-2">Salary Range</h3>

          <p>
            {toLPA(salMin)} — {toLPA(salMax)}{" "}
            <span className="text-gray-400 text-sm">(Estimated LPA)</span>
          </p>

          <p className="text-gray-400 text-xs mt-1">
            Parsed from: {parsed.salaryRange || "N/A"}
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h3 className="text-blue-300 mb-2">Education</h3>
          <p>{parsed.education}</p>
        </div>
      </div>

      {/* KEYWORDS */}
      <section className="bg-gray-900 p-6 rounded-lg border border-gray-700 mt-6 mb-6">
        <h2 className="text-xl text-blue-400 mb-4 font-semibold">Keywords</h2>

        <div className="flex gap-2 flex-wrap">
          {(parsed.keywords || []).map((k: string, i: number) => (
            <span key={i} className="px-3 py-1 bg-gray-800 rounded-md text-sm">
              {k}
            </span>
          ))}
        </div>
      </section>

      {/* TECH STACK */}
      <section className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-6">
        <h2 className="text-xl text-blue-400 mb-4 font-semibold">
          Technical Stack
        </h2>

        <div className="flex gap-2 flex-wrap">
          {(parsed.technicalStack || []).map((t: string, i: number) => (
            <span key={i} className="px-3 py-1 bg-green-700 rounded-md text-sm">
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* SOFT SKILLS */}
      <section className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-10">
        <h2 className="text-xl text-blue-400 mb-4 font-semibold">
          Soft Skills
        </h2>

        <div className="flex gap-2 flex-wrap">
          {(parsed.softSkills || []).map((t: string, i: number) => (
            <span key={i} className="px-3 py-1 bg-purple-700 rounded-md text-sm">
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* SAVE BUTTON */}
      <button
        onClick={handleSaveJob}
        disabled={saving}
        className="mt-10 bg-blue-600 hover:bg-blue-500 text-xl px-10 py-5 rounded-lg flex items-center gap-3 font-semibold"
      >
        <FaCheckCircle />
        {saving ? "Saving…" : "Save & Create Job"}
      </button>
    </div>
  );
};

export default JobParsedSummary;
